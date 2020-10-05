# Programation web 💻

## JavaScript

"use strict" ==> mode d'execution de la VM JS. Empêche certaine possibilité.

### Closure 🔒

```JS
let val = 0;
function counter() {
    return val++;
}

counter();
counter();

```

Mauvaise pratique val n'est pas lié au compteur, on peut donc la modifié hors de la fonction.
La fonction nous garantie donc pas de renvoyé la valeur précédente +1.
On chercherais à faire

```JS
function counter() {
    let val=0;
    return val++;
}
```

Le problème est que val revindra toujours à 0;

```JS
function counter() {
    let val=0;
    let next = function() {
        return val++;
    }
    return next;
}
```

La fonction next est lié au context de counter donc la prochaine fois que next est appeler elle incrementera bien la valeur de val.
Les fonctions déclarer sont lié à leur _scope_. Ceci permet d'avoir des attribut "privé".
Ici val est "privé" on à aucun moyen de modifié val hors du contexte de la `counter`.

```JS
//IIFE = Invocation imédiate;

let counter = function() {
    let val=0;
    let next = function() {
        return val++;
    }
    return next;
}()

counter() // ==> appel next()
```

En javascript il est possible de traiter un nombre arbitraire d'argument et de leur attibuer des valeurs par défaut.

```JS
let counter = function(init = 0) { //attribution valeur par défaut;
    let val = init;
    let next = function(){};
    let reset = function(){val = init;}
    return {
        next : next,
        reset: reset
    } //Objet avec deux chanmps; ici un objet litteral déclaration { }
}

let c = counter();
c.next() // appel la fonction next;
c.reset() //appel la fonciton reset

//autre appel :
c["next"]();
```

Une fonction capture donc son contexte.

### Objet

En JS pratiquement tout est objet. JavaScript est un langage objets par prototypes.
Pour définir un objet:

```JS
let o1 = {x:1}; //Objet littéral
let o2 = {}; //Objet vide
let o3 = Object.create(); //Définis un objets
```

Un objet hérite d'un prototype (tout objet hérite de Object).
Lors d'un appel à une fonction hérité, le moteur JS va parcourir la chaine de prototype jusqu'à trouvé la fonction correspondante. Ceci est fait **dynamiquement**.

```JS
object.__proto__ // accède au prototype (Mais on fais pas comme ça)
Object.getPrototypeOf(object); // On prefere ça

//Ajout d'une fonction au protoype
Object.getPrototypeOf(object).aire = () => { return 1; }
```

#### this

Le `this` en JS représente le contexte de la fonction. Par exemple:

```JS

let rectangle = {
    width: 10,
    height: 20,
}

rectangle.aire = function() {
    return this.width * this.width;
}
```

**Attention**: Le this est lié au context de l'appelant.

```JS

let o = {
    msg: "coucou",
    print: function() { console.log(this.msg)}
}

o.print()
//coucou

let display = o.print;
display();
//undifined

msg = "titi"
display();
//titi

o.print();
//coucou
```

Lors d'un eventListener si on passe en paramètre une fonction utilisant `this`, celui ci correspondra à l'événement et non à l'objet.
Pour contrecarrer ça, il est possible de lié le `this` à un objet particulier.

```JS
let display2 = diplay.bind(o); //bind renvoie une fonction
display2()
//coucou
display()
//undifined
```

A voir [call](https://www.w3schools.com/js/js_function_call.asp) et [apply](https://www.w3schools.com/js/js_function_apply.asp). Utile même si techniquement ` f.call(2) == f(2)`. (Parole de prof 😜).

### EcmaScript 6 ([ES6](https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets) pour les intimes)

_Oui le liens de l'extension est pour ES7 mais installe la quand même c'est pratique_

#### Les classes

```JS
class Rectangle {
    construction(w,h) {
        this.height = h;
        this.width = w;
    }

    surface() {
        console.log("Surface = " + this.height, this.width)
    }

}

let r1 = new Rectangle(1,2);
r1.surface();
//Surface = 2
```

Les mots clé `get` et `set` permette de définir si une propriété est en readOnly, writeOnly ou ReadWrite.
Ici le get sur la fonction surface nous permet d'accéder à la fonction comme un attribut. Mais la fonction ne pourra pas être modifié (au `runtime`).

```JS
class Rectangle {
    construction(w,h) {
        this.height = h;
        this.width = w;
    }

    get surface() {
        console.log("Surface = " + this.height, this.width)
    }
    set reinit(s) {
        this.height = s; this.width = s
    }

}

let r2 = new Rectangle(10,20);
r2.surface;
//Surface = 200

r2.reinit = 80;
// r2.witdth = 80 ; r2.height = 80
```

#### Héritage

Bonus pas dis en cours

**Héritage simple**

```JS
class Rectangle extends Shape {

}
```

[**Héritage plus chiant à faire**](https://medium.com/@luke_smaki/javascript-es6-classes-8a34b0a6720a)

### Bonus : Lambda

[Lambda et fonction annonyme en javascript](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Fonctions/Fonctions_fl%C3%A9ch%C3%A9es)

```JS
let sum = (x, y) => x+y;
let inc = sum.bind(null,1); //bind x avec 1
inc(2);
```
