import * as fs from "fs";
var beautify = require("js-beautify").js;

export default class Content {
  private name: string;

  constructor(nom: string = "Test") {
    this.name = nom;
  }

  public async createGlobalContent() {
    const composer: string = `    {
            "name": "${this.name.toLowerCase()}/php-project",
            "autoload": {
                "psr-4": {
                    "${this.name}\\\\": "src/"
                }
            },
            "require": {
                "phpmailer/phpmailer": "^6.8.0"
            },
            "require-dev": {
                "phpunit/phpunit": "^9.5"
            }
        }`;
    fs.writeFileSync("composer.json", composer);
  }

  public async createTestContent() {
    const test: string = `<?php declare(strict_types=1); \nnamespace Tests; \nuse PHPUnit\\Framework\\TestCase; \nuse PHPUnit\\Framework\\InvalidArgumentException; \ninclude 'src/config/config.php'; \n\nfinal class Test extends TestCase{\n\n}`;
    fs.writeFileSync(`tests/${this.name}Test.php`, test);
  }

  public async createSrcContent() {
    const helper: string = `<?php

function error($field) {
    return isset($_SESSION["error"][$field]) ? $_SESSION["error"][$field]: "";
}

function old($field) {
    return isset($_SESSION["old"][$field]) ? $_SESSION["old"][$field] : "";
}

function success() {
    return isset($_SESSION["success"]) ? $_SESSION["success"] : "";
}

function erreur() {
    return isset($_SESSION["erreur"]) ? $_SESSION["erreur"] : "";
}

function escape($data) {
    return stripslashes(trim(htmlspecialchars($data)));
}

function slugify($str) {
    // replace non letter or digits by -
    $str = preg_replace('~[^\\pL\\d]+~u', '-', $str);
    // transliterate
    $str = iconv('utf-8', 'us-ascii//TRANSLIT', $str);
    // remove unwanted characters
    $str = preg_replace('~[^-\\w]+~', '', $str);
    // trim
    $str = trim($str, '-');
    // remove duplicate -
    $str = preg_replace('~-+~', '-', $str);
    // lowercase
    $str = strtolower($str);
    if (empty($str)) {
        return 'n-a';
    }
    return $str;
}`;
    const validator: string = `<?php
namespace ${this.name};

/** Class Validator **/
class Validator {

    private $data;
    private $errors = [];
    private $messages = [
        "required" => "Le champ est requis !",
        "min" => "Le champ doit contenir un minimum de %^% lettres !",
        "max" => "Le champ doit contenir un maximum de %^% lettres !",
        "regex" => "Le format n'est pas respecté",
        "length" => "Le champ doit contenir %^% caractère(s) !",
        "url" => "Le champ doit correspondre à une url !",
        "email" => "Le champ doit correspondre à une email: exemple@gmail.com !",
        "date" => "Le champ doit être une date !",
        "alpha" => "Le champ peut contenir que des lettres minuscules et majuscules !",
        "alphaNum" => "Le champ peut contenir que des lettres minuscules, majuscules et des chiffres !",
        "alphaNumDash" => "Le champ peut contenir que des lettres minuscules, majuscules, des chiffres, des slash et des tirets !",
        "numeric" => "Le champ peut contenir que des chiffres !",
        "confirm" => "Le champs n'est pas conforme au confirm !"
        // "maxOf50" => "Votre champ ne peut pas aller au dela de 50 charactere !"
    ];
    private $rules = [
        "required" => "#^.+$#",
        "min" => "#^.{ù,}$#",
        "max" => "#^.{0,ù}$#",
        "length" => "#^.{ù}$#",
        "regex" => "ù",
        "url" => FILTER_VALIDATE_URL,
        "email" => FILTER_VALIDATE_EMAIL,
        "date" => "#^(\\d{4})(\\/|-)(0[0-9]|1[0-2])(\\/|-)([0-2][0-9]|3[0-1])$#",
        "alpha" => "#^[A-z]+$#",
        "alphaNum" => "#^[A-z0-9]+$#",
        "alphaNumDash" => "#^[A-z0-9-\|]+$#",
        "numeric" => "#^[0-9]+$#",
        "confirm" => ""
        // "maxOf50" => "#^(?=.{0,50}$)([-'\\w]+\\s)*[-'\\w]+$#"
    ];

    public function __construct($data = []) {
        $this->data = $data ?: $_POST;
    }

    public function validate($array) {
        foreach ($array as $field => $rules) {
            $this->validateField($field, $rules);
        }
    }

    public function validateField($field, $rules) {
        foreach ($rules as $rule) {
            $this->validateRule($field, $rule);
        }
    }

    public function validateRule($field, $rule) {
        $res = strrpos($rule, ":");
        if ($res == true) {
            $repRule = explode(":", $rule);
            $changeRule = str_replace("ù", $repRule[1], $this->rules[$repRule[0]]);
            $changeMessage = str_replace("%^%", $repRule[1], $this->messages[$repRule[0]]);

            if (!preg_match($changeRule, $this->data[$field])) {
                $this->errors = [$this->messages[$repRule[0]]];
                $this->storeSession($field, $changeMessage);
            }
        } elseif ($res == false) {
            if ($rule == "confirm") {
                if (!isset($this->data[$field . 'Confirm'])) {
                    $this->errors = ["Nous buttons sur un problème"];
                    $this->storeSession('confirm', "Nous buttons sur un problème");
                } elseif (isset($this->data[$field . 'Confirm']) && $this->data[$field] != $this->data[$field . 'Confirm']) {
                    $this->errors = [$this->messages[$rule]];
                    $this->storeSession('confirm', $this->messages[$rule]);
                }
                return;
            }
            if ($rule == "email" || $rule == "url") {
                if (!filter_var($this->data[$field], $this->rules[$rule])) {
                    $this->errors = [$this->messages[$rule]];
                    $this->storeSession($field, $this->messages[$rule]);
                }
            }
            elseif (!preg_match($this->rules[$rule], $this->data[$field])) {
                $this->errors = [$this->messages[$rule]];
                $this->storeSession($field, $this->messages[$rule]);
            }
        }
    }

    public function errors() {
        return $this->errors;
    }

    public function storeSession($field, $error) {
        if (!isset($_SESSION["error"][$field])) {
            $_SESSION["error"][$field] = $error;
        } else {
            return;
        }
    }

}`;
    const route: string = `<?php
namespace ${this.name};

class Route {

    private $path;
    private $callable;
    private $matches = [];
    private $params = [];

    public function __construct($path, $callable){
        $this->path = trim($path, '/');
        $this->callable = $callable;
    }

    public function match($url){
        $url = trim($url, '/');
        $path = preg_replace('#:([\w]+)#', '([^/]+)', $this->path);
        $regex = "#^$path$#i";
        if(!preg_match($regex, $url, $matches)){
            return false;
        }
        array_shift($matches);
        $this->matches = $matches;
        return true;
    }

    public function call() {
            $rep = explode("@", $this->callable);
            $controller = "${this.name}\\\\Controllers\\\\".$rep[0];
            $controller = new $controller();

        return call_user_func_array([$controller, $rep[1]], $this->matches);
    }

}`;
    const router: string = `<?php
namespace ${this.name};

/** Class Router **/

class Router {

    private $url;
    private $routes = [];

    public function __construct($url){
        $this->url = $url;
    }

    public function get($path, $callable) {
        $route = new Route($path, $callable);
        $this->routes["GET"][] = $route;
        
        return $route;
    }

    public function post($path, $callable) {
        $route = new Route($path, $callable);
        $this->routes["POST"][] = $route;
        return $route;
    }

    public function run() {
        if(!isset($this->routes[$_SERVER['REQUEST_METHOD']])){
            throw new \\Exception('REQUEST_METHOD does not exist');
        }
        
        foreach($this->routes[$_SERVER['REQUEST_METHOD']] as $route){
            
            if($route->match($this->url)){
                
                return $route->call();
            }
        }
        // throw new \\Exception('No matching routes');
        require VIEWS . '404.php';
    }

}`;
    fs.writeFileSync(`src/helper.php`, helper);
    fs.writeFileSync(`src/Validator.php`, validator);
    fs.writeFileSync(`src/Router.php`, router);
    fs.writeFileSync(`src/Route.php`, route);
  }

  public async createMvcContent() {
    const layout: string = `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8"> 
    <meta http-equiv="X-UA-Compatible" content="IE=edge"> 
    <meta name="viewport" content="width=device-width, initial-scale=1.0"> 
    
    <title>${this.name}</title> 
    <link rel="shortcut icon" href="<?= URL . "/img/logo.png" ?>" type="image/x-icon">
    <link rel="stylesheet" href="<?= URL . "/style.css" ?> "> 
    
    <script src="https://kit.fontawesome.com/ac7bce0ab5.js" crossorigin="anonymous"></script> 
</head> 
<body>
    <header>
    </header>
    <main> 
        <?php echo $content; ?> 
    </main> 
<script src="js/app.js"></script>
</body>

<?php 
unset($_SESSION['error']); 
unset($_SESSION['old']); 
unset($_SESSION['success']); 
unset($_SESSION['erreur']);`;
    const error404: string = `<?php
ob_start();

?>

<section class="error">
    <h1>Erreur 404</h1>
    <p>La page rechercher n'existe pas ! <a href="/">Quitter cette page !</a></p>
</section>

<?php

$content = ob_get_clean();
require VIEWS . 'layout.php';`;
    const accueil: string = `<?php
ob_start();
?>
<section>
</section>
<?php
$content = ob_get_clean();
require VIEWS . 'layout.php';`;
    const elManager: string = `<?php

namespace ${this.name}\\Models;

use ${this.name}\\Models\\${this.name};
use ${this.name}\\Models\\Bdd;

/** Class ${this.name}Manager **/
class ${this.name}Manager extends Bdd
{

}`;
    const el: string = `<?php

namespace ${this.name}\\Models;

/** Class ${this.name} **/
class ${this.name} 
{

    // Methodes

    private $id;

    public function getId()
    {
        return $this->id;
    }

    public function setId(String $id){
        $this->id = $id;
    }

}`;
    const bdd: string = `<?php

namespace ${this.name}\\Models;

class Bdd
{
    public $bdd;

    public function __construct()
    {
        $this->bdd = new \\PDO('mysql:host=' . HOST . ';dbname=' . DATABASE . ';charset=utf8;', USER, PASSWORD);
        $this->bdd->setAttribute(\\PDO::ATTR_ERRMODE, \\PDO::ERRMODE_EXCEPTION);
    }
}`;
    const controller: string = `<?php

namespace ${this.name}\\Controllers;

use ${this.name}\\Models\\${this.name}Manager;
use ${this.name}\\Validator;

/** Class ${this.name}Controller **/
class ${this.name}Controller
{
    private $manager;
    private $validator;

    public function __construct()
    {
        $this->manager = new ${this.name}Manager();
        $this->validator = new Validator();
    }

    public function index()
    {
        require VIEWS . '${this.name}/accueil.php';
    }

    // Example Function
    public function example()
    {
        $this->validator->validate([
            "test" => ["required"]
        ]);

        if (!$this->validator->errors()) {

        } else {

        }
    }
}`;
    const config: string = `<?php
define("SRC", '../src/');
define("CONTROLLERS", '../src/Controllers/');
define("MODELS", '../src/Models/');
define("VIEWS", '../src/Views/');
define("URL","http://localhost:8000");

define('HOST', '127.0.0.1');
define('DATABASE', '${this.name}');
define('USER', 'root');
define('PASSWORD', '');`;

    fs.writeFileSync(`src/Views/layout.php`, layout);
    fs.writeFileSync(`src/Views/404.php`, error404);
    fs.writeFileSync(`src/Views/${this.name}/accueil.php`, accueil);
    fs.writeFileSync(`src/Models/${this.name}Manager.php`, elManager);
    fs.writeFileSync(`src/Models/${this.name}.php`, el);
    fs.writeFileSync(`src/Models/Bdd.php`, bdd);
    fs.writeFileSync(`src/Controllers/${this.name}Controller.php`, controller);
    fs.writeFileSync(`src/config/config.php`, config);
  }

  public async createPublicContent() {
    const htaccess: string = `RewriteEngine on
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^ /index.php [L]`;

    const index: string = `<?php

session_start();

require '../src/config/config.php';
require '../vendor/autoload.php';
require SRC . 'helper.php';

$router = new ${this.name}\\Router($_SERVER["REQUEST_URI"]);
//Index of the webPage
$router -> get('/', "${this.name}Controller@index"); // Page accueil

$router -> post('/example', "${this.name}Controller@example"); // Example Post;
$router->run();`;

    fs.writeFileSync(`public/.htaccess`, htaccess);
    fs.writeFileSync(`public/index.php`, index);
  }
}
