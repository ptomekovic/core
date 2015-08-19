/* SET ENVIRONMENT VARIABLE USE_CRON=0 to deactive Cronprocessing; Default ist 1 */
var env = process.env.HK_DEBUG;
if (typeof(process.env.HK_DEBUG) === 'undefined' || (process.env.HK_DEBUG>0 && process.env.HK_DEBUG!=1)) {

   Herokit.Config.debug.console=true;
   Herokit.Config.debug.loglevel = process.env.HK_DEBUG;
}
