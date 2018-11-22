<?php

use Phalcon\Mvc\Controller;

class ErrorsController extends ControllerBase
{

    public function initialize()
    {
        $this->tag->setTitle('Страница не найдена!');
	 
    }

    public function show404Action()
    {
        $this->view->setTemplateAfter('main');

        $this->view->setTemplateBefore("404");
    }

    public function show401Action()
    {
        $this->view->setTemplateAfter('main');

        $this->view->setTemplateBefore("404");
    }

    public function show500Action($exception)
    {
        $this->view->setTemplateAfter('main');

        $this->view->setTemplateBefore("404");
    }
}

