window.addEventListener("load", () => {
    const c = document.getElementById('mijn_canvas');
    const ctx = c.getContext('2d');

    //canvas_top
    const ct = document.getElementById('canvas_top');
    const ctxt = ct.getContext('2d');

    //constanten en variabelen
    const size = 30;
    const line = 3;
    let posX = line - 2;
    let posY = line - 2;
    let paint = false;
    let lWidth = 10;
    let canPaint = false;
    const colors = ['#FCF314', '#7EED15', '#3E7A00', '#4DAFAE', '#2D5AFE', '#763FA4', '#C068FE', '#CF53AE', '#EC4400', '#EC4409', '#F17C08', '#F8B202', '#FFFFFF'];
    let curr_color = [];

    //events
    c.addEventListener("mousedown", neer);
    c.addEventListener("mousedown", kleuren);
    c.addEventListener("mouseup", niet_neer);
    c.addEventListener("mousemove", kleuren);

    //https://www.geeksforgeeks.org/how-to-get-the-coordinates-of-a-mouse-click-on-a-canvas-element/

    c.addEventListener("mousedown", function (e) {
        getMousePosition(c, e);
    });

    //functie voor muispositie
    function muispositie(e) {
        //muispositie opslaan in var
        xPos = e.clientX - c.offsetLeft;
        yPos = e.clientY - c.offsetTop;
    }

    //muis ingedrukt?
    function neer(e) {
        //bool op true zetten
        if (canPaint) paint = true;
        console.log(paint);

    }

    function niet_neer(evt) {
        //bool op false zetten
        paint = false;
        console.log(paint);
        ctx.beginPath();

    }

    function selectColor(e) {
        return curr_color;

    }

    function getMousePosition(c, event) {

        let rect = c.getBoundingClientRect();
        let x = event.clientX - rect.left;
        let y = event.clientY - rect.top;
        console.log("Coordinate x: " + x,
            "Coordinate y: " + y);

        // functie kiezen kleur bij klik
        // vergelijkingen om te controleren op welke kleur-vierkant geklikt wordt.
        // detect clicks and choose colors

        if (x > 0 && x < blocks_pos[0] && y < size) {
            console.log("yellow");
            curr_color[0] = colors[0];
            canPaint = true;
        } else if (x > blocks_pos[0] && x < blocks_pos[1] && y < size) {
            console.log("yellow-green");
            curr_color[0] = colors[1];
            canPaint = true;
        } else if (x > blocks_pos[1] && x < blocks_pos[2] && y < size) {
            console.log("green");
            curr_color[0] = colors[2];
            canPaint = true;
        } else if (x > blocks_pos[2] && x < blocks_pos[3] && y < size) {
            console.log("blue-green");
            curr_color[0] = colors[3];
            canPaint = true;
        } else if (x > blocks_pos[3] && x < blocks_pos[4] && y < size) {
            console.log("blue");
            curr_color[0] = colors[4];
            canPaint = true;
        } else if (x > blocks_pos[4] && x < blocks_pos[5] && y < size) {
            console.log("blue-violet");
            curr_color[0] = colors[5];
            canPaint = true;
        } else if (x > blocks_pos[5] && x < blocks_pos[6] && y < size) {
            console.log("violet");
            curr_color[0] = colors[6];
        } else if (x > blocks_pos[6] && x < blocks_pos[7] && y < size) {
            console.log("red-violet");
            curr_color[0] = colors[7];
            canPaint = true;
        } else if (x > blocks_pos[7] && x < blocks_pos[8] && y < size) {
            console.log("red");
            curr_color[0] = colors[8];
            canPaint = true;
        } else if (x > blocks_pos[8] && x < blocks_pos[9] && y < size) {
            console.log("red-orange");
            curr_color[0] = colors[9];
            canPaint = true;
        } else if (x > blocks_pos[9] && x < blocks_pos[10] && y < size) {
            console.log("orange");
            curr_color[0] = colors[10];
            canPaint = true;
        } else if (x > blocks_pos[10] && x < blocks_pos[11] && y < size) {
            console.log("yellow-orange");
            curr_color[0] = colors[11];
            canPaint = true;
        } else if (x > blocks_pos[11] && x < blocks_pos[12] && y < size) {
            console.log("white");
            curr_color[0] = colors[12];
            canPaint = true;
        }
        
        //line thickness
        if (x < c.width && x > blocks_pos_imgs[0] + size && y < size) {
            console.log("thickness 3");
            lWidth = 10;
        }

        if (x < blocks_pos_imgs[0] + size && x > blocks_pos_imgs[1] + size && y < size) {
            console.log("thickness 2");
            lWidth = 5;
        }

        if (x < blocks_pos_imgs[1] + size && x > blocks_pos_imgs[2] + size && y < size) {
            console.log("thickness 1");
            lWidth = 2;
        }

    }

    //rechthoeken voor de kleur tekenen.
    function teken_rechthoek(x, y, w, h, kleur) {

        //flexibele herbruikbare functie om kleur-vierkanten te tekenen

        ctxt.fillStyle = kleur;
        ctxt.lineWidth = line;
        ctxt.strokeRect(x, y, w, h);
        ctxt.fillRect(x, y, w, h);

    }

    //functie om te kleuren
    function kleuren(e) {

        //lijnen trekken. Deze zijn afhankelijk van de x en y van de muis.

        if (!paint) return;
        muispositie(e);

        ctx.lineWidth = lWidth;
        ctx.lineCap = 'round';

        let rect = c.getBoundingClientRect();
        let x = event.clientX - rect.left;
        let y = event.clientY - rect.top;

        ctx.lineTo(x, y);
        ctx.strokeStyle = selectColor(e);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, y);

    }

    /*
    start drawing
    https://www.usability.gov/how-to-and-tools/methods/color-basics.html
    pick up a color, starts from yellow and go clockwise
    */

    //store blocks-positions
    blocks_pos = [];

    //draw palette
    for (let color in colors) {
        console.log(colors[color]);
        teken_rechthoek(posX, posY, size, size, colors[color]);
        posX += size;
        blocks_pos[color] = posX;
    }
    //line width buttons
    const line_imgs = ['img/ico_1.png', 'img/ico_2.png', 'img/ico_3.png'];
    let imgs = [];
    blocks_pos_imgs = [];

    function drawLineIco(x, y, wx, wy, img) {
        teken_rechthoek(x, y, wx, wy);
        ctxt.drawImage(img, x, y, wx, wy);
    }

    for (let img in line_imgs) {

        imgs[img] = new Image();
        startx = c.width - size - 1;
        imgs[img].onload = function () {
            drawLineIco(startx, 1, size, size, this);
            startx -= size;
            blocks_pos_imgs[img] = startx;
        }
        imgs[img].src = line_imgs[img];
        console.log(imgs[img].src);
    }

});