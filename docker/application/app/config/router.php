<?php

$router = new \Phalcon\Mvc\Router(FALSE);
$router->removeExtraSlashes(true);

$router->add(
    '/',
    [
        "controller" => "index",
        "action"     => "index",
    ]
);

$router->add(
    "/post/:action",
    [
        "controller" => 'post',
        "action"     => 1,
    ]
);

$router->notFound(
    [
        "controller" => "index",
        "action"     => "index",
    ]
);



return $router;