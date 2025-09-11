/* eslint-disable */

module.exports = async function () {
  console.log(globalThis.__TEARDOWN_MESSAGE__);

  // Clean up API process if we started it
  if (globalThis.__GLOBAL_TEST_CONTEXT__?.apiProcess) {
    console.log('Stopping API server...');

    try {
      // Gracefully terminate the process
      globalThis.__GLOBAL_TEST_CONTEXT__.apiProcess.kill('SIGTERM');

      // Wait a bit for graceful shutdown
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Force kill if still running
      if (!globalThis.__GLOBAL_TEST_CONTEXT__.apiProcess.killed) {
        globalThis.__GLOBAL_TEST_CONTEXT__.apiProcess.kill('SIGKILL');
      }

      console.log('API server stopped');
    } catch (error) {
      console.warn('Error stopping API server:', error);
    }
  }

  // Clean up global context
  if (globalThis.__GLOBAL_TEST_CONTEXT__) {
    globalThis.__GLOBAL_TEST_CONTEXT__ = undefined as any;
  }
};
