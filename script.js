/* =========================================
   TEXTO PRINCIPAL
========================================= */

const mensaje =
"Se que no son colabs con Sheglam para coleccionar, por ahora, jsjs, pero es lo que sé, mi conocimiento, mi mente y mi corazón todas puestos en ti para demostrarte cuando lindo es el amor que tengo por ti y lo lindo que me hace sentir el tuyo, te amo musho Muki, espero te guste, lo hice con mucho amor :3";


/* =========================================
   ELEMENTOS
========================================= */

const inicio =
    document.getElementById("inicio");

const florInicial =
    document.getElementById("florInicial");

const indicacion =
    document.getElementById("indicacion");

const semilla =
    document.getElementById("semilla");

const arbol =
    document.getElementById("arbol");

const flores =
    document.getElementById("flores");

const floresVolando =
    document.getElementById("floresVolando");

const textoFinal =
    document.getElementById("textoFinal");

const amorGrande =
    document.getElementById("amorGrande");

const mensajeExtra =
    document.getElementById("mensajeExtra");


/* =========================================
   CONTROL
========================================= */

let iniciado = false;


/*
   Este valor mueve ÚNICAMENTE
   el corazón de flores hacia arriba.

   No mueve:
   - tronco
   - ramas
   - suelo
   - texto
*/

const DESPLAZAMIENTO_CORAZON_Y = -38;


/* =========================================
   CREAR FLOR
========================================= */

function crearFlor(x, y, escala) {

    const exterior =
        document.createElementNS(
            "http://www.w3.org/2000/svg",
            "g"
        );

    exterior.classList.add("florArbol");


    /*
       Aquí aplicamos el desplazamiento
       vertical del corazón.
    */

    exterior.setAttribute(
        "transform",
        `translate(${x} ${y + DESPLAZAMIENTO_CORAZON_Y})`
    );


    const interior =
        document.createElementNS(
            "http://www.w3.org/2000/svg",
            "g"
        );

    interior.classList.add(
        "florAnimada"
    );


    interior.setAttribute(
        "transform",
        `scale(${escala})`
    );


    /* PÉTALOS */

    for (let i = 0; i < 8; i++) {

        const petalo =
            document.createElementNS(
                "http://www.w3.org/2000/svg",
                "ellipse"
            );

        petalo.setAttribute(
            "cx",
            "0"
        );

        petalo.setAttribute(
            "cy",
            "-7"
        );

        petalo.setAttribute(
            "rx",
            "5.5"
        );

        petalo.setAttribute(
            "ry",
            "8"
        );

        petalo.setAttribute(
            "transform",
            `rotate(${i * 45})`
        );

        petalo.setAttribute(
            "fill",
            "#f4b817"
        );

        interior.appendChild(
            petalo
        );
    }


    /* CENTRO */

    const centro =
        document.createElementNS(
            "http://www.w3.org/2000/svg",
            "circle"
        );

    centro.setAttribute(
        "cx",
        "0"
    );

    centro.setAttribute(
        "cy",
        "0"
    );

    centro.setAttribute(
        "r",
        "3.5"
    );

    centro.setAttribute(
        "fill",
        "#563013"
    );


    interior.appendChild(
        centro
    );

    exterior.appendChild(
        interior
    );

    flores.appendChild(
        exterior
    );


    return exterior;
}


/* =========================================
   FORMA DEL CORAZÓN
========================================= */

function crearFormaDelCorazon() {

    const puntos = [];


    /*
       Curva matemática de corazón.

       Esta es solamente la forma
       que usamos para decidir dónde
       pueden aparecer las flores.
    */

    for (
        let i = 0;
        i <= 240;
        i++
    ) {

        const t =
            (Math.PI * 2 * i) /
            240;


        const x =
            16 *
            Math.pow(
                Math.sin(t),
                3
            );


        const y =
            13 *
            Math.cos(t)
            - 5 *
            Math.cos(2 * t)
            - 2 *
            Math.cos(3 * t)
            - Math.cos(4 * t);


        puntos.push({

            x:
                500 +
                x * 24,

            y:
                425 -
                y * 22

        });

    }


    return puntos;
}


const formaCorazon =
    crearFormaDelCorazon();


/* =========================================
   SABER SI UN PUNTO ESTÁ DENTRO
   DEL CORAZÓN
========================================= */

function estaDentroDelCorazon(x, y) {

    let dentro = false;


    for (
        let i = 0,
        j = formaCorazon.length - 1;

        i < formaCorazon.length;

        j = i++
    ) {

        const xi =
            formaCorazon[i].x;

        const yi =
            formaCorazon[i].y;


        const xj =
            formaCorazon[j].x;

        const yj =
            formaCorazon[j].y;


        const intersecta =

            ((yi > y) !== (yj > y))

            &&

            (
                x <
                (xj - xi) *
                (y - yi) /
                (yj - yi) +
                xi
            );


        if (intersecta) {

            dentro = !dentro;

        }

    }


    return dentro;
}


/* =========================================
   GENERAR TODAS LAS FLORES
========================================= */

function generarFlores() {

    flores.innerHTML = "";


    const posiciones = [];


    /*
       Primera capa:
       flores ordenadas dentro
       de toda la silueta.
    */

    for (
        let y = 145;
        y <= 700;
        y += 17
    ) {

        for (
            let x = 130;
            x <= 870;
            x += 17
        ) {

            if (
                estaDentroDelCorazon(
                    x,
                    y
                )
            ) {

                posiciones.push({

                    x:
                        x +
                        (
                            Math.random() -
                            .5
                        ) * 10,

                    y:
                        y +
                        (
                            Math.random() -
                            .5
                        ) * 10

                });

            }

        }

    }


    /*
       Segunda capa:
       flores aleatorias para
       quitar apariencia de cuadrícula.
    */

    for (
        let i = 0;
        i < 260;
        i++
    ) {

        const x =
            120 +
            Math.random() *
            760;


        const y =
            145 +
            Math.random() *
            570;


        if (
            estaDentroDelCorazon(
                x,
                y
            )
        ) {

            posiciones.push({

                x: x,

                y: y

            });

        }

    }


    /*
       Refuerzo de la parte inferior
       para que la punta del corazón
       quede llena.
    */

    for (
        let i = 0;
        i < 70;
        i++
    ) {

        const x =
            420 +
            Math.random() *
            160;


        const y =
            570 +
            Math.random() *
            125;


        if (
            estaDentroDelCorazon(
                x,
                y
            )
        ) {

            posiciones.push({

                x: x,

                y: y

            });

        }

    }


    /*
       Crear las flores.
    */

    posiciones.forEach(
        (pos, index) => {

            const escala =
                .68 +
                Math.random() *
                .30;


            const flor =
                crearFlor(
                    pos.x,
                    pos.y,
                    escala
                );


            setTimeout(
                () => {

                    flor.classList.add(
                        "visible"
                    );

                },
                index * 8
            );

        }
    );


    return posiciones.length;
}


/* =========================================
   CLIC EN LA FLOR INICIAL
========================================= */

florInicial.addEventListener(
    "click",
    () => {

        if (iniciado) return;

        iniciado = true;


        /* Desaparece la flor inicial */

        florInicial.style.transition =
            "opacity .5s ease, transform .5s ease";


        florInicial.style.opacity =
            "0";


        florInicial.style.transform =
            "scale(.15) rotate(25deg)";


        indicacion.style.opacity =
            "0";


        /*
           Después de desaparecer la flor,
           aparece la semilla y empieza a caer.

           También ocultamos la pantalla inicial
           para que la semilla pueda verse.
        */

        setTimeout(
            () => {

                inicio.classList.add(
                    "oculto"
                );


                semilla.classList.add(
                    "caer"
                );

            },
            500
        );

    }
);


/* =========================================
   CUANDO TERMINA DE CAER LA SEMILLA
========================================= */

semilla.addEventListener(
    "animationend",
    () => {

        /*
           La semilla desaparece.
        */

        semilla.style.opacity =
            "0";


        /*
           Empieza a crecer el árbol.
        */

        arbol.classList.add(
            "crecer"
        );


        /*
           Después empiezan las ramas.
        */

        setTimeout(
            () => {

                arbol.classList.add(
                    "ramasCreciendo"
                );

            },
            2050
        );


        /*
           Después empiezan las flores.
        */

        setTimeout(
            () => {

                const cantidad =
                    generarFlores();


                const espera =
                    cantidad * 8 +
                    1800;


                setTimeout(
                    () => {

                        moverArbol();

                    },
                    espera
                );

            },
            3650
        );

    }
);


/* =========================================
   MOVER EL ÁRBOL HACIA LA DERECHA
========================================= */

function moverArbol() {

    arbol.classList.add(
        "moverDerecha"
    );


    setTimeout(
        () => {

            iniciarFloresVolando();


            /*
               PRIMERO:
               comienza a escribirse
               el mensaje principal.
            */

            escribirMensaje();


            /*
               SEGUNDO:
               esperamos a que el mensaje
               principal termine realmente.
            */

            document.addEventListener(
                "mensajeTerminado",
                () => {

                    /*
                       Esperamos 3 segundos.
                    */

                    setTimeout(
                        () => {

                            amorGrande.classList.add(
                                "visible"
                            );


                            /*
                               Después de aparecer
                               TE AMO MAGUUU!!!

                               esperamos 5 segundos.
                            */

                            setTimeout(
                                () => {

                                    mensajeExtra.classList.add(
                                        "visible"
                                    );

                                },
                                5000
                            );

                        },
                        3000
                    );

                },
                { once: true }
            );

        },
        3000
    );

}


/* =========================================
   CREAR FLOR VOLANDO
========================================= */

function crearFlorVolando() {

    const flor =
        document.createElement(
            "div"
        );


    flor.className =
        "florVolando";


    /*
       Las flores caen principalmente
       por el lado izquierdo.
    */

    const x =
        3 +
        Math.random() *
        70;


    const y =
        35 +
        Math.random() *
        40;


    const movimientoX =
        -120 +
        Math.random() *
        240;


    const rotacion =
        -360 +
        Math.random() *
        720;


    const duracion =
        6 +
        Math.random() *
        5;


    flor.style.left =
        `${x}%`;


    flor.style.top =
        `${y}%`;


    flor.style.setProperty(
        "--x",
        `${movimientoX}px`
    );


    flor.style.setProperty(
        "--r",
        `${rotacion}deg`
    );


    flor.style.animationDuration =
        `${duracion}s`;


    /*
       Pétalos
    */

    for (
        let i = 1;
        i <= 6;
        i++
    ) {

        const petalo =
            document.createElement(
                "span"
            );


        petalo.className =
            `petalo p${i}`;


        flor.appendChild(
            petalo
        );

    }


    /*
       Centro
    */

    const centro =
        document.createElement(
            "span"
        );


    centro.className =
        "centro";


    flor.appendChild(
        centro
    );


    floresVolando.appendChild(
        flor
    );


    /*
       Eliminar cuando termina
       su animación.
    */

    flor.addEventListener(
        "animationend",
        () => {

            flor.remove();

        }
    );

}


/* =========================================
   INICIAR FLORES QUE CAEN
========================================= */

function iniciarFloresVolando() {

    /*
       Primera tanda.
    */

    for (
        let i = 0;
        i < 14;
        i++
    ) {

        setTimeout(
            () => {

                crearFlorVolando();

            },
            i * 250
        );

    }


    /*
       Después siguen apareciendo.
    */

    setInterval(
        () => {

            crearFlorVolando();


            if (
                Math.random() > .65
            ) {

                setTimeout(
                    crearFlorVolando,
                    300
                );

            }

        },
        900
    );

}


/* =========================================
   ESCRIBIR MENSAJE PRINCIPAL
========================================= */

function escribirMensaje() {

    textoFinal.innerHTML = "";


    const cursor =
        document.createElement(
            "span"
        );


    cursor.className =
        "cursor";


    let i = 0;


    function siguienteLetra() {

    if (
        i >= mensaje.length
    ) {

        textoFinal.appendChild(
            cursor
        );

        /*
           Avisamos que el primer mensaje
           terminó completamente.
        */

        document.dispatchEvent(
            new Event("mensajeTerminado")
        );

        return;

    }


        textoFinal.textContent =
            mensaje.substring(
                0,
                i + 1
            );


        textoFinal.appendChild(
            cursor
        );


        const letra =
            mensaje[i];


        i++;


        let velocidad = 30;


        if (
            letra === "," ||
            letra === "."
        ) {

            velocidad = 150;

        }


        if (
            letra === ":" ||
            letra === ";"
        ) {

            velocidad = 120;

        }


        setTimeout(
            siguienteLetra,
            velocidad
        );

    }


    siguienteLetra();

}