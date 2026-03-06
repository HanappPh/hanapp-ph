import csv
from pathlib import Path

IN_CSV = Path("data/psgc.csv")
OUT_SQL = Path("supabase/seed.sql")

COL_PSGC = "10-digit PSGC"
COL_NAME = "Name"
COL_CORRESPONDENCE = "Correspondence Code"
COL_GEO_LEVEL = "Geographic Level"
COL_STATUS = "Status"


def esc(value: str) -> str:
    return value.replace("'", "''")


def normalize_geo_level(raw: str) -> str:
    return (raw or "").strip().upper()


def to_lgu_type(geo_level: str) -> str | None:
    if geo_level == "CITY":
        return "CITY"
    if geo_level == "MUN":
        return "MUNICIPALITY"
    return None


def derive_region_code(psgc: str, correspondence: str, current_region: str | None) -> str:
    if current_region:
        return current_region
    if correspondence and len(correspondence) >= 2:
        return correspondence[:2]
    if psgc and len(psgc) >= 2:
        return psgc[:2]
    return ""


def derive_province_code(correspondence: str, current_province: str | None) -> str | None:
    if current_province:
        return current_province
    if correspondence and len(correspondence) >= 4:
        return correspondence[:4]
    return None


def is_active_from_status(status: str) -> bool:
    normalized = (status or "").strip().upper()
    if not normalized:
        return True
    return normalized not in {"INACTIVE", "ARCHIVED", "DELISTED"}


def main() -> None:
    if not IN_CSV.exists():
        raise SystemExit(f"Input CSV not found: {IN_CSV}")

    rows: list[tuple[str, str, str, str | None, str, bool]] = []
    current_region_code: str | None = None
    current_province_code: str | None = None

    with IN_CSV.open("r", encoding="utf-8-sig", newline="") as csv_file:
        reader = csv.DictReader(csv_file)
        headers = set(reader.fieldnames or [])
        required = {COL_PSGC, COL_NAME, COL_CORRESPONDENCE, COL_GEO_LEVEL}
        missing = required - headers
        if missing:
            raise SystemExit(
                "Missing required CSV headers: "
                + ", ".join(sorted(missing))
                + "\nUpdate the COL_* mappings in scripts/psgc_to_seed.py"
            )

        for raw in reader:
            psgc = (raw.get(COL_PSGC) or "").strip()
            name = (raw.get(COL_NAME) or "").strip()
            correspondence = (raw.get(COL_CORRESPONDENCE) or "").strip()
            geo_level = normalize_geo_level(raw.get(COL_GEO_LEVEL) or "")
            status = (raw.get(COL_STATUS) or "").strip() if COL_STATUS in headers else ""

            if not psgc or not name or not geo_level:
                continue

            if geo_level in {"REG", "REGION"}:
                current_region_code = correspondence[:2] if len(correspondence) >= 2 else psgc[:2]
                current_province_code = None
                continue

            if geo_level in {"PROV", "PROVINCE"}:
                current_province_code = (
                    correspondence[:4] if len(correspondence) >= 4 else None
                )
                continue

            lgu_type = to_lgu_type(geo_level)
            if lgu_type is None:
                continue

            region_code = derive_region_code(psgc, correspondence, current_region_code)
            if not region_code:
                continue

            province_code = derive_province_code(correspondence, current_province_code)
            if region_code == "13" and geo_level == "CITY":
                province_code = None

            rows.append(
                (
                    psgc,
                    name,
                    region_code,
                    province_code,
                    lgu_type,
                    is_active_from_status(status),
                )
            )

    if not rows:
        raise SystemExit("No CITY/MUNICIPALITY rows found in CSV.")

    sql_lines: list[str] = [
        "-- Auto-generated from data/psgc.csv",
        "-- Regenerate with: python scripts/psgc_to_seed.py",
        "truncate table public.lgus;",
        "insert into public.lgus (psgc_code, name, region_code, province_code, type, is_active)",
        "values",
    ]

    values_sql: list[str] = []
    for psgc, name, region, province, lgu_type, is_active in rows:
        province_sql = "null" if province is None else f"'{esc(province)}'"
        active_sql = "true" if is_active else "false"
        values_sql.append(
            f"('{esc(psgc)}', '{esc(name)}', '{esc(region)}', {province_sql}, '{lgu_type}', {active_sql})"
        )

    sql_lines.append(",\n".join(values_sql) + ";")
    sql_lines.append(f"-- Total LGU rows inserted: {len(rows)}")

    OUT_SQL.parent.mkdir(parents=True, exist_ok=True)
    OUT_SQL.write_text("\n".join(sql_lines) + "\n", encoding="utf-8")

    print(f"Wrote {OUT_SQL} with {len(rows)} CITY/MUNICIPALITY rows.")


if __name__ == "__main__":
    main()
