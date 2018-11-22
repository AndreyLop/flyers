<?php
define('DOCROOT', dirname(dirname(dirname(__FILE__))) . DIRECTORY_SEPARATOR);
$loader = new \Phalcon\Loader();

/**
 * We're a registering a set of directories taken from the configuration file
 */


$loader->registerDirs(
    [
        $config->application->controllersDir,
        $config->application->modelsDir,
        $config->application->formsDir,
        $config->application->libraryDir,
		$config->application->pluginsDir
    ]
);



$loader->register();