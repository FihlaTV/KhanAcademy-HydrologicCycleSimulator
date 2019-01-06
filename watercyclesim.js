void setup() {
    size(850, 400);
    
}

/* @pjs preload="tree.png"; */
PImage tree_image;

tree_image = loadImage("tree.png");

/**                                    **\

[Version 1.2]
Hidrologic Cycle Simulator - By Goncalerta

    -> This simulator only works with width = 1200
    -> Click on the action buttons to make the water cycle from one place to another one.
    
  +-------------------------------------+
  |              CHANGELOG              |
  +-------------------------------------+

[Version 2.0]                   23/02/2015
    -> Precipitation will cause a storm when atmosphere has more tham 100 water.
    -> In the storm you can see thunder.
    -> The storm ends when "Soil & Life" gets full of water or atmosphere water becomes less than 30.

[Version 1.2]                   22/02/2015
    -> Sun is more now more reallistic.

[Version 1.1]                   19/02/2015
    -> Added sunlight in "Evaporation"

[Version 1.0]                   18/02/2015
    -> First version of the Simulator.
    -> Main functions implemented.



  +-------------------------------------+
  |           PLANNED CONTENT           |
  +-------------------------------------+
  
    -> Storm animation more realistic
    -> More reallistic clouds formation
    -> Lake formations + "Soil & Life" above 80 water
    
\**                                     **/


//Normal Variables
var aw = 15; //Atmosphere Water    CAP 120
var tw = 20; //Water Table Water    CAP 50
var lw = 50; //Soil & Life Water    CAP 80

//Instant Updating Variables
var raw = 15; //Atmosphere Water
var rtw = 20; //Water Table Water
var rlw = 50; //Soil & Life Water

//Suport Variables
var drop = []; //Water Drops Array
var ea; //Evaporation Animation
var storm = false; //Storm Mode
    //Thunder Variables
var thunderProb = 0.05; // Probability
var thunder = false; //Thunder Happening
var thunderFrame = 0; //Frame Checker
var thunderXpos; //Thunder Position


//Button Colors
var rcp = color(217, 35, 35, 200);
var rce = color(217, 35, 35, 200);
var rct = color(217, 35, 35, 200);
var rci = color(217, 35, 35, 200);
var rcr = color(217, 35, 35, 200);

//Precipitation             (Action ID: 1)
var precipitation = function(w){
    if(storm){
        for(var i = 0; i < w; i++){
        drop.push({
            xPos: random(0, width+5),
            yPos: random(70, 105),
            action: 1
        });
        
        var r = random(1);
        if(r < thunderProb){
            thunder = true;
            
            thunderProb = 0;
        }else{
            thunderProb+= 0.01;
        }
        
        aw--;
        raw--;
        rlw++;
        }
    }else{
        for(var i = 0; i < w; i++){
        drop.push({
            xPos: random(200, 270),
            yPos: random(90, 105),
            action: 1
        });
        
        aw--;
        raw--;
        rlw++;
        }
    }
    
};

//Evaporation               (Action ID: 2)
var evaporation = function(w){
    for(var i = 0; i < w; i++){
        drop.push({
            xPos: random(570, 635),
            yPos: random(280, 320),
            action: 2
        });
        
        raw++;
    }
};

//Evapotranspiration        (Action ID: 3)
var evapotranspiration = function(w){
    for(var i = 0; i < w; i++){
        drop.push({
            xPos: random(300, 370),
            yPos: random(200, 300),
            action: 3
        });
        
        raw++;
        lw--;
        rlw--;
    }
};

//Infiltration              (Action ID: 4)
var infiltration = function(w){
    for(var i = 0; i < w; i++){
        drop.push({
            xPos: random(0, 510),
            yPos: random(310, 325),
            action: 4
        });
        
        lw--;
        rlw--;
        rtw++;
    }
};

//Return To The Sea         (Action ID: 5)
var seaReturn = function(w){
    for(var i = 0; i < w; i++){
        drop.push({
            xPos: random(520, 535),
            yPos: random(380, 400),
            action: 5
        });
        
        tw--;
        rtw--;
    }
};




//drawCloud suport function
var drawCloud = function(xPos, yPos, width){
    ellipse(xPos-51, yPos-3, width+20, width);
    ellipse(xPos, yPos, width+20, width);
    ellipse(xPos-21, yPos-1, width+40, width+15);
};



//Draw Function
void draw() {
    noStroke();
    
    //Background (Atmosphere)
    for(var bg = 0; bg < 50; bg++){
        fill(107-aw/2, 225-aw/2.5, 255-aw/3);
        rect(0, bg*4, 1000, 500);
        fill(186, 186, 186, aw);
        rect(0, bg*4, 1000, 500);
    }
    
    //Sun
    for(var sg = 0; sg < 50; sg++){
        fill(255, 183, 0, 255-sg*10);
        ellipse(width-100, 170, 60+sg, 60+sg);
    }
    
    
    //Clouds
    fill(280-aw, 280-aw, 280-aw, aw*15);
    ellipse(224, 77, 60, 40);
    ellipse(291, 81, 60, 40);
    ellipse(254, 77, 80, 55); 
    drawCloud(170, 51, 40);
    
    //Atmosphere Darkener
    fill(100-aw/3, 100-aw/3, 100-aw/3, aw*2-10);
    rect(0, 0, 1000, 1000);
    
    //Ocean
    fill(5, 64, 173, 150);
    rect(-30, 270, 1000, 1000);

    //Land
    fill(36, 133, 21);
    triangle(0, 300, 300, 400, 130, 100);
    fill(255, 255, 255);
    triangle(100, 145, 150, 134, 130, 100);
    fill(184-lw, 171+lw/2, 30);
    quad(-20, 240, 510, 257, 559, 500, -20, 510);
    fill(179, 96, 23);
    quad(-20, 315, 528, 344, 560, 500, -20, 510);
    image(tree_image, 70, 120);
    image(tree_image, 280, 140);
    
    //Water
    fill(23, 98, 179, 200);
    quad(-20, 400-tw, 542, 417-tw, 566, 500, -20, 510);
    
    if(ea){
        fill(255, 102, 0, 200);
    triangle(720, 185, 550, 300, 650, 304);
    }
    
    
    
    //Text
    fill(255, 255, 255);
    textSize(35);
    text("Ocean", 675, 300, 100, 100);
    text("Atmosphere", 475, 100, 200, 100);
    text("Water Table", 50, 330, 200, 100);
    textSize(25);
    text("Soil & Life", 165, 260, 200, 100);
    
    textSize(15);
    text("Too Much Water", 700, 335, 200, 100);
    text(aw +" Water", 580, 135, 200, 100);
    text(tw +" Water", 150, 358, 200, 100);
    text(lw +" Water", 200, 280, 200, 100);
    
    
    //Button Rectangles
    stroke(38, 41, 46);
    strokeWeight(3);
    fill(rce);
    rect(560, 168, 95, 30);
    fill(rcp);
    rect(167, 109, 100, 28);
    fill(rcr);
    rect(445, 355, 130, 25);
    fill(rci);
    rect(280, 315, 84, 30);
    fill(rct);
    rect(320, 127, 134, 29);
    
    //Button Text
    fill(38, 38, 38);
    noStroke();
    textSize(15);
    text("Evaporation", 568, 177, 120, 40);
    text("Return to the Sea", 452, 362, 120, 40);
    text("Precipitation", 175, 116, 120, 40);
    text("Infiltration", 290, 323, 110, 40);
    text("Evapotranspiration", 325, 135, 200, 30);
    
    
    
    //Water Drops Drawer and Animator
    for(var l = 0; l < drop.length; l++){
        
        //Action ID Reader
        switch(drop[l].action){
            case 1:
                drop[l].yPos+= 3;
                drop[l].xPos--;
                if(drop[l].yPos > 280){
                    drop[l] = {xPos: -500};
                    lw++;
                }
            break;
            
            case 2: 
                drop[l].yPos-= 3;
                ea = true;
                if(drop[l].yPos < 200){
                    drop[l] = {xPos: -500};
                    aw++;
                    ea = false;
                }
            break;
            case 3: 
                drop[l].yPos-= 2;
                drop[l].xPos++;
                if(drop[l].yPos < 185){
                    drop[l] = {xPos: -500};
                    aw++;
                }
            break;
            case 4: 
                drop[l].yPos+= 10;
                
                if(drop[l].yPos > 400){
                    drop[l] = {xPos: -500};
                    tw++;
                }
            break;
            case 5: 
                drop[l].xPos+= 4;
                drop[l].yPos++;
                
                if(drop[l].yPos > 400){
                    drop[l] = {xPos: -500};}
            break;
        }
        
        //Draw Drop
        fill(111, 219, 252);
        ellipse(drop[l].xPos, drop[l].yPos, 8, 8);
    }
    
    //Max Detector
    if(aw > 120){aw = 120;}
    if(tw > 70){tw = 70;}
    if(lw > 80){lw = 80;}
    
    if(storm){
        if(raw > 30 && rlw < 75){
            precipitation(1);
        }else{
            storm = false;
        }
    }
    
    
    if(thunder){
        if(thunderFrame === 0){
          thunderXpos = random(20, width);
          thunderFrame++;
        } else if(thunderFrame < 5){
            fill(245, 231, 137);
            pushMatrix();
            rotate(20);
            rect(thunderXpos, 0, 10, 250);
            popMatrix();
            thunderFrame++;
        }else if(thunderFrame < 300){
            fill(255, 255, 255, 355-thunderFrame);
            ellipse(thunderXpos, 250, thunderFrame*20, thunderFrame*20);
            
            thunderFrame+= 5;
        }else{
            thunderFrame = 0;
            thunder = false;
        }
        
    }
    
    
    //Rectangle Color Changer
    //Precipitation
    if(raw < 1 || rlw >= 78){rcp = color(82, 68, 68, 255);}
    else if(mouseX > 167 &&
            mouseX < 267 &&
            mouseY > 109 &&
            mouseY < 137)
        {rcp = color(230, 74, 74, 200);}
    else{rcp = color(212, 34, 34, 200);}

    //Evaporation
    if(raw >= 118){rce = color(82, 68, 68, 255);}
    else if(mouseX > 560 &&
            mouseX < 655 &&
            mouseY > 168 &&
            mouseY < 198)
        {rce = color(230, 74, 74, 200);}
    else{rce = color(212, 34, 34, 200);}
    
    //Evapotranspiration
    if(raw >= 118 || rlw < 3){rct = color(82, 68, 68, 255);}
    else if(mouseX > 320 &&
            mouseX < 454 &&
            mouseY > 127 &&
            mouseY < 156)
        {rct = color(230, 74, 74, 200);}
    else{rct = color(212, 34, 34, 200);}
    
    //Infiltration
    if(rtw >= 46 || rlw < 3){rci = color(82, 68, 68, 255);}
    else if(mouseX > 280 &&
            mouseX < 364 &&
            mouseY > 315 &&
            mouseY < 345)
        {rci = color(230, 74, 74, 200);}
    else{rci = color(212, 34, 34, 200);}
    
    //Return to the Sea
    if(rtw <= 2){rcr = color(82, 68, 68, 255);}
    else if(mouseX > 445 &&
            mouseX < 575 &&
            mouseY > 355 &&
            mouseY < 380)
        {rcr = color(230, 74, 74, 200);}
    else{rcr = color(212, 34, 34, 200);}
    
    
};

//mouseClicked Event Handler
void mouseClicked() {
    
    //Precipitation Button
    if(mouseX > 167 &&
       mouseX < 267 &&
       mouseY > 109 &&
       mouseY < 137 &&
       raw > 1 &&
       rlw < 79){
           if(aw > 100 && lw < 75){
              storm = true;
           }else{
              precipitation(2);   
           }
           rcp = color(89, 60, 60, 200);
    }
    
    //Evaporation Button
    if(mouseX > 560 &&
       mouseX < 655 &&
       mouseY > 168 &&
       mouseY < 198 &&
       raw < 118){
           evaporation(3);
           rce = color(89, 60, 60, 200);
    }
    
    
    // Evapotranspiration Button
    if(mouseX > 320 &&
       mouseX < 454 &&
       mouseY > 127 &&
       mouseY < 156 &&
       raw < 118 &&
       rlw > 2){
           evapotranspiration(3);
           rct = color(89, 60, 60, 200);
    }
    
    //Infiltration Button
    if(mouseX > 280 &&
       mouseX < 364 &&
       mouseY > 315 &&
       mouseY < 345 &&
       rtw <= 46 &&
       rlw >= 4){
           infiltration(4);
           rci = color(89, 60, 60, 200);
    }
    
    //Return to the Sea Button
    if(mouseX > 445 &&
       mouseX < 575 &&
       mouseY > 355 &&
       mouseY < 380 &&
       rtw >= 3){
           seaReturn(3);
           rcr = color(89, 60, 60, 200);
    }
};