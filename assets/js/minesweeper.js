let table;
let bombs;
let min;
let max;
let cell;
let curr;
let currWidth = 0;
let currHeight = 0;
let count;
let countF;
let freeCells;
let matrix;
let clicks;

document.getElementById('currentTable').addEventListener("click", function() { document.getElementById("victory").textContent = ""; resetTable(); });

function createTable(width, height){
    clicks = 0;
    table = document.getElementById('Beginner');
    table.innerHTML = '';
    table = document.getElementById('Intermediate');
    table.innerHTML = '';
    table = document.getElementById('Expert');
    table.innerHTML = '';
    document.getElementById("currentTable").textContent = ':)';
    matrix = [];
    for(var i=0; i<height; i++) {
        matrix[i] = new Array(width);
    }
    switch(width){
        case 9:
            table = document.getElementById('Beginner');
            table.className = "Beginner";
            //document.getElementById('currentTable').textContent = 'Beginner';
            bombs = 10;
            currWidth=9;
            currHeight=9;
            break;
        case 16:
            table = document.getElementById('Intermediate');
            table.className = "Intermediate";
            //document.getElementById('currentTable').textContent = 'Intermediate';
            bombs = 40;
            currWidth=16;
            currHeight=16;
            break;
        case 30:
            table = document.getElementById('Expert');
            table.className = "Expert";
            //document.getElementById('currentTable').textContent = 'Expert';
            bombs = 99;
            currWidth=30;
            currHeight=16;
            break;
    }
    freeCells=width*height - bombs;
    //console.log(freeCells);
    for (let i = 0; i < height; i++){
        var tr = document.createElement('tr');

        for(let j=0; j<width; j++){
            var td = document.createElement('td');
            var text = document.createTextNode('');
            td.appendChild(text);
            td.addEventListener('click', function(){ clicks++; cellClick(i,j); });
            td.className="notClicked";
            curr = (i).toString() + "-" + (j).toString();
            td.addEventListener('contextmenu', function(){ clicks++; flag(i.toString() + "-" + j.toString());  });
            //console.log(curr);
            td.id = curr;
            tr.appendChild(td);
        }  

        table.appendChild(tr);
    }
    document.body.appendChild(table);
    let p = document.createElement('p');
    document.body.appendChild(p);
    p.id="victory";
    p.textContent = "";

    for(var i=0; i<bombs; i++){
        curr = (Math.floor(Math.random()*(height))).toString() + '-' + (Math.floor(Math.random()*(width))).toString();
        cell = document.getElementById(curr);
        cell.textContent = 'X';
        cell.style.color = "red";
    }

    for(var i=0; i<currHeight; i++){
        for(var j=0; j<currWidth; j++){
            count = 0;
            curr = (i).toString() + "-" + (j).toString();
            cell = document.getElementById(curr);
            if(cell.textContent != 'X'){
                //usx corner
                if(i==0 && j==0){
                    if(document.getElementById((i).toString() + "-" + (j+1).toString()).textContent == 'X') count++;   //dx
                    if(document.getElementById((i+1).toString() + "-" + (j+1).toString()).textContent == 'X') count++; //ddx
                    if(document.getElementById((i+1).toString() + "-" + (j).toString()).textContent == 'X') count++;   //d
                }
                //udx corner
                else if(i==0 && j==currWidth-1){
                    if(document.getElementById((i+1).toString() + "-" + (j-1).toString()).textContent == 'X') count++; //dsx
                    if(document.getElementById((i+1).toString() + "-" + (j).toString()).textContent == 'X') count++;   //d
                    if(document.getElementById((i).toString() + "-" + (j-1).toString()).textContent == 'X') count++;   //sx
                }
                //dsx corner
                else if(i==currHeight-1 && j==0){
                    if(document.getElementById((i).toString() + "-" + (j+1).toString()).textContent == 'X') count++;   //dx
                    if(document.getElementById((i-1).toString() + "-" + (j+1).toString()).textContent == 'X') count++; //udx
                    if(document.getElementById((i-1).toString() + "-" + (j).toString()).textContent == 'X') count++;   //u
                }
                //ddx corner
                else if(i==currHeight-1 && j==currWidth-1){
                    if(document.getElementById((i-1).toString() + "-" + (j).toString()).textContent == 'X') count++;   //u
                    if(document.getElementById((i-1).toString() + "-" + (j-1).toString()).textContent == 'X') count++; //usx
                    if(document.getElementById((i).toString() + "-" + (j-1).toString()).textContent == 'X') count++;   //sx
                }
                else if(i==0){
                    if(document.getElementById((i).toString() + "-" + (j-1).toString()).textContent == 'X') count++;   //sx
                    if(document.getElementById((i).toString() + "-" + (j+1).toString()).textContent == 'X') count++;   //dx
                    if(document.getElementById((i+1).toString() + "-" + (j-1).toString()).textContent == 'X') count++; //dsx
                    if(document.getElementById((i+1).toString() + "-" + (j).toString()).textContent == 'X') count++;   //d
                    if(document.getElementById((i+1).toString() + "-" + (j+1).toString()).textContent == 'X') count++; //ddx
                }
                else if(i==currHeight-1){
                    if(document.getElementById((i).toString() + "-" + (j-1).toString()).textContent == 'X') count++;   //sx
                    if(document.getElementById((i).toString() + "-" + (j+1).toString()).textContent == 'X') count++;   //dx
                    if(document.getElementById((i-1).toString() + "-" + (j-1).toString()).textContent == 'X') count++; //usx
                    if(document.getElementById((i-1).toString() + "-" + (j+1).toString()).textContent == 'X') count++; //udx
                    if(document.getElementById((i-1).toString() + "-" + (j).toString()).textContent == 'X') count++;   //u
                }
                else if(j==0){
                    if(document.getElementById((i).toString() + "-" + (j+1).toString()).textContent == 'X') count++;   //dx
                    if(document.getElementById((i-1).toString() + "-" + (j+1).toString()).textContent == 'X') count++; //udx
                    if(document.getElementById((i-1).toString() + "-" + (j).toString()).textContent == 'X') count++;   //u
                    if(document.getElementById((i+1).toString() + "-" + (j+1).toString()).textContent == 'X') count++; //ddx
                    if(document.getElementById((i+1).toString() + "-" + (j).toString()).textContent == 'X') count++;   //d
                }
                else if(j==currWidth-1){
                    if(document.getElementById((i-1).toString() + "-" + (j).toString()).textContent == 'X') count++;   //u
                    if(document.getElementById((i+1).toString() + "-" + (j).toString()).textContent == 'X') count++;   //d
                    if(document.getElementById((i).toString() + "-" + (j-1).toString()).textContent == 'X') count++;   //sx
                    if(document.getElementById((i-1).toString() + "-" + (j-1).toString()).textContent == 'X') count++; //usx
                    if(document.getElementById((i+1).toString() + "-" + (j-1).toString()).textContent == 'X') count++; //dsx
                }
                else{
                    if(document.getElementById((i).toString() + "-" + (j-1).toString()).textContent == 'X') count++;   //sx
                    if(document.getElementById((i).toString() + "-" + (j+1).toString()).textContent == 'X') count++;   //dx
                    if(document.getElementById((i-1).toString() + "-" + (j-1).toString()).textContent == 'X') count++; //usx
                    if(document.getElementById((i-1).toString() + "-" + (j+1).toString()).textContent == 'X') count++; //udx
                    if(document.getElementById((i+1).toString() + "-" + (j-1).toString()).textContent == 'X') count++; //dsx
                    if(document.getElementById((i+1).toString() + "-" + (j+1).toString()).textContent == 'X') count++; //ddx
                    if(document.getElementById((i-1).toString() + "-" + (j).toString()).textContent == 'X') count++;   //u
                    if(document.getElementById((i+1).toString() + "-" + (j).toString()).textContent == 'X') count++;   //d
                }
                if(count != 0){
                    cell.textContent = count.toString();
                    switch(count){
                        case 1:
                            cell.style.color = "blue";
                            break;
                        case 2:
                            cell.style.color = "green";
                            break;
                        case 3:
                            cell.style.color = "red";
                            break;
                        case 4:
                            cell.style.color = "darkblue";
                            break;
                        case 5:
                            cell.style.color = "darkred";
                            break;
                        case 6:
                            cell.style.color = "turquoise";
                            break;
                        case 7:
                            cell.style.color = "black";
                            break;
                        case 8:
                            cell.style.color = "brown";
                            break;
                    }
                }
            }
            //cell.id += " " + count.toString();7
            //console.log(cell.id);
        }
    }

}

function resetTable(){
    if(currWidth != 0 && currHeight != 0){
        clicks = 0;
        table = document.getElementById('Beginner');
        table.innerHTML = '';
        table = document.getElementById('Intermediate');
        table.innerHTML = '';
        table = document.getElementById('Expert');
        table.innerHTML = '';
        freeCells=currWidth*currHeight - bombs;
        document.getElementById("currentTable").textContent = ':)';
        matrix = [];
        for(var i=0; i<currHeight; i++) {
            matrix[i] = new Array(currWidth);
        }
        switch(currWidth){
            case 9:
                table = document.getElementById('Beginner');
                table.className = "Beginner";
                //document.getElementById('currentTable').textContent = 'Beginner';
                bombs = 10;
                currWidth=9;
                currHeight=9;
                break;
            case 16:
                table = document.getElementById('Intermediate');
                table.className = "Intermediate";
                //document.getElementById('currentTable').textContent = 'Intermediate';
                bombs = 40;
                currWidth=16;
                currHeight=16;
                break;
            case 30:
                table = document.getElementById('Expert');
                table.className = "Expert";
                //document.getElementById('currentTable').textContent = 'Expert';
                bombs = 99;
                currWidth=30;
                currHeight=16;
                break;
        }
        for (let i = 0; i < currHeight; i++){
            var tr = document.createElement('tr');

            for(let j=0; j<currWidth; j++){
                var td = document.createElement('td');
                var text = document.createTextNode('');
                td.appendChild(text);
                td.addEventListener('click', function(){ clicks++; cellClick(i,j); });
                td.classList="notClicked";
                curr = (i).toString() + "-" + (j).toString();
                td.addEventListener('contextmenu', function(){ clicks++; flag(i.toString() + "-" + j.toString());  });
                //console.log(curr);
                td.id = curr;
                tr.appendChild(td);
            }  

            table.appendChild(tr);
        }
        document.body.appendChild(table);
        let p = document.createElement('p');
        document.body.appendChild(p);
        p.id="victory";
        p.textContent = "";


        for(var i=0; i<bombs; i++){
            curr = (Math.floor(Math.random()*(currHeight))).toString() + '-' + (Math.floor(Math.random()*(currWidth))).toString();
            cell = document.getElementById(curr);
            cell.textContent = 'X';
            cell.style.color = "red";
        }

        for(var i=0; i<currHeight; i++){
            for(var j=0; j<currWidth; j++){
                count = 0;
                curr = (i).toString() + "-" + (j).toString();
                cell = document.getElementById(curr);
                //console.log(curr);

                if(cell.textContent != 'X'){
                    //usx corner
                    if(i==0 && j==0){
                    if(document.getElementById((i).toString() + "-" + (j+1).toString()).textContent == 'X') count++;   //dx
                    if(document.getElementById((i+1).toString() + "-" + (j+1).toString()).textContent == 'X') count++; //ddx
                    if(document.getElementById((i+1).toString() + "-" + (j).toString()).textContent == 'X') count++;   //d
                    }
                    //udx corner
                    else if(i==0 && j==currWidth-1){
                        if(document.getElementById((i+1).toString() + "-" + (j-1).toString()).textContent == 'X') count++; //dsx
                        if(document.getElementById((i+1).toString() + "-" + (j).toString()).textContent == 'X') count++;   //d
                        if(document.getElementById((i).toString() + "-" + (j-1).toString()).textContent == 'X') count++;   //sx
                    }
                    //dsx corner
                    else if(i==currHeight-1 && j==0){
                        if(document.getElementById((i).toString() + "-" + (j+1).toString()).textContent == 'X') count++;   //dx
                        if(document.getElementById((i-1).toString() + "-" + (j+1).toString()).textContent == 'X') count++; //udx
                        if(document.getElementById((i-1).toString() + "-" + (j).toString()).textContent == 'X') count++;   //u
                    }
                    //ddx corner
                    else if(i==currHeight-1 && j==currWidth-1){
                        if(document.getElementById((i-1).toString() + "-" + (j).toString()).textContent == 'X') count++;   //u
                        if(document.getElementById((i-1).toString() + "-" + (j-1).toString()).textContent == 'X') count++; //usx
                        if(document.getElementById((i).toString() + "-" + (j-1).toString()).textContent == 'X') count++;   //sx
                    }
                    else if(i==0){
                        if(document.getElementById((i).toString() + "-" + (j-1).toString()).textContent == 'X') count++;   //sx
                        if(document.getElementById((i).toString() + "-" + (j+1).toString()).textContent == 'X') count++;   //dx
                        if(document.getElementById((i+1).toString() + "-" + (j-1).toString()).textContent == 'X') count++; //dsx
                        if(document.getElementById((i+1).toString() + "-" + (j).toString()).textContent == 'X') count++;   //d
                        if(document.getElementById((i+1).toString() + "-" + (j+1).toString()).textContent == 'X') count++; //ddx
                    }
                    else if(i==currHeight-1){
                        if(document.getElementById((i).toString() + "-" + (j-1).toString()).textContent == 'X') count++;   //sx
                        if(document.getElementById((i).toString() + "-" + (j+1).toString()).textContent == 'X') count++;   //dx
                        if(document.getElementById((i-1).toString() + "-" + (j-1).toString()).textContent == 'X') count++; //usx
                        if(document.getElementById((i-1).toString() + "-" + (j+1).toString()).textContent == 'X') count++; //udx
                        if(document.getElementById((i-1).toString() + "-" + (j).toString()).textContent == 'X') count++;   //u
                    }
                    else if(j==0){
                        if(document.getElementById((i).toString() + "-" + (j+1).toString()).textContent == 'X') count++;   //dx
                        if(document.getElementById((i-1).toString() + "-" + (j+1).toString()).textContent == 'X') count++; //udx
                        if(document.getElementById((i-1).toString() + "-" + (j).toString()).textContent == 'X') count++;   //u
                        if(document.getElementById((i+1).toString() + "-" + (j+1).toString()).textContent == 'X') count++; //ddx
                        if(document.getElementById((i+1).toString() + "-" + (j).toString()).textContent == 'X') count++;   //d
                    }
                    else if(j==currWidth-1){
                        if(document.getElementById((i-1).toString() + "-" + (j).toString()).textContent == 'X') count++;   //u
                        if(document.getElementById((i+1).toString() + "-" + (j).toString()).textContent == 'X') count++;   //d
                        if(document.getElementById((i).toString() + "-" + (j-1).toString()).textContent == 'X') count++;   //sx
                        if(document.getElementById((i-1).toString() + "-" + (j-1).toString()).textContent == 'X') count++; //usx
                        if(document.getElementById((i+1).toString() + "-" + (j-1).toString()).textContent == 'X') count++; //dsx
                    }
                    else{
                        if(document.getElementById((i).toString() + "-" + (j-1).toString()).textContent == 'X') count++;   //sx
                        if(document.getElementById((i).toString() + "-" + (j+1).toString()).textContent == 'X') count++;   //dx
                        if(document.getElementById((i-1).toString() + "-" + (j-1).toString()).textContent == 'X') count++; //usx
                        if(document.getElementById((i-1).toString() + "-" + (j+1).toString()).textContent == 'X') count++; //udx
                        if(document.getElementById((i+1).toString() + "-" + (j-1).toString()).textContent == 'X') count++; //dsx
                        if(document.getElementById((i+1).toString() + "-" + (j+1).toString()).textContent == 'X') count++; //ddx
                        if(document.getElementById((i-1).toString() + "-" + (j).toString()).textContent == 'X') count++;   //u
                        if(document.getElementById((i+1).toString() + "-" + (j).toString()).textContent == 'X') count++;   //d
                    }

                    if(count != 0){
                        cell.textContent = count.toString();
                        switch(count){
                            case 1:
                                cell.style.color = "blue";
                                break;
                            case 2:
                                cell.style.color = "green";
                                break;
                            case 3:
                                cell.style.color = "red";
                                break;
                            case 4:
                                cell.style.color = "darkblue";
                                break;
                            case 5:
                                cell.style.color = "darkred";
                                break;
                            case 6:
                                cell.style.color = "turquoise";
                                break;
                            case 7:
                                cell.style.color = "black";
                                break;
                            case 8:
                                cell.style.color = "brown";
                                break;
                        }
                    }
                }
                //cell.id += " " + count.toString();7
                //console.log(cell.id);
            }
        }

    }
}

function cellClick(i, j){
    
    curr = (i).toString() + "-" + (j).toString();

    if(document.getElementById(curr).classList.contains("notClicked") && document.getElementById(curr).textContent != 'F'){

        console.log("clicked " + curr);
        document.getElementById(curr).classList.remove("notClicked");
        document.getElementById(curr).classList.add("clicked");
        

        if(document.getElementById(curr).textContent == 'X'){
            console.log("bomb");
            document.getElementById("currentTable").textContent = ':(';
            for(var i=0; i<currHeight; i++){
                for(var j=0; j<currWidth; j++){
                    count = 0;
                    curr = (i).toString() + "-" + (j).toString();
                    cell = document.getElementById(curr);
                    if(document.getElementById(curr).classList.contains("notClicked")){
                        document.getElementById(curr).classList.remove("notClicked");
                        document.getElementById(curr).classList.add("clicked");
                    }
                }
            }
        }

        if(document.getElementById(curr).textContent == 0 && document.getElementById(curr).textContent != 'X'){
            //usx corner
            if(i==0 && j==0){
                if(document.getElementById((i).toString() + "-" + (j+1).toString()).className == "notClicked") cellClick(i, j+1);
                if(document.getElementById((i+1).toString() + "-" + (j+1).toString()).className == "notClicked") cellClick(i+1, j+1);
                if(document.getElementById((i+1).toString() + "-" + (j).toString()).className == "notClicked") cellClick(i+1, j);
            }
            //udx corner
            else if(i==0 && j==currWidth-1){
                if(document.getElementById((i+1).toString() + "-" + (j-1).toString()).className == "notClicked") cellClick(i+1, j-1);
                if(document.getElementById((i+1).toString() + "-" + (j).toString()).className == "notClicked") cellClick(i+1, j);
                if(document.getElementById((i).toString() + "-" + (j-1).toString()).className == "notClicked") cellClick(i, j-1);
            }
            //dsx corner
            else if(i==currHeight-1 && j==0){
                if(document.getElementById((i).toString() + "-" + (j+1).toString()).className == "notClicked") cellClick(i, j+1);
                if(document.getElementById((i-1).toString() + "-" + (j+1).toString()).className == "notClicked") cellClick(i-1, j+1);
                if(document.getElementById((i-1).toString() + "-" + (j).toString()).className == "notClicked") cellClick(i-1, j);
            }
            //ddx corner
            else if(i==currHeight-1 && j==currWidth-1){
                if(document.getElementById((i-1).toString() + "-" + (j).toString()).className == "notClicked") cellClick(i-1, j);
                if(document.getElementById((i-1).toString() + "-" + (j-1).toString()).className == "notClicked") cellClick(i-1, j-1);
                if(document.getElementById((i).toString() + "-" + (j-1).toString()).className == "notClicked") cellClick(i, j-1);
            }
            else if(i==0){
                if(document.getElementById((i).toString() + "-" + (j-1).toString()).className == "notClicked") cellClick(i, j-1);
                if(document.getElementById((i).toString() + "-" + (j+1).toString()).className == "notClicked") cellClick(i, j+1);
                if(document.getElementById((i+1).toString() + "-" + (j-1).toString()).className == "notClicked") cellClick(i+1, j-1);
                if(document.getElementById((i+1).toString() + "-" + (j).toString()).className == "notClicked") cellClick(i+1, j);
                if(document.getElementById((i+1).toString() + "-" + (j+1).toString()).className == "notClicked") cellClick(i+1, j+1);
            }
            else if(i==currHeight-1){
                if(document.getElementById((i).toString() + "-" + (j-1).toString()).className == "notClicked") cellClick(i, j-1);
                if(document.getElementById((i).toString() + "-" + (j+1).toString()).className == "notClicked") cellClick(i, j+1);
                if(document.getElementById((i-1).toString() + "-" + (j-1).toString()).className == "notClicked") cellClick(i-1, j-1);
                if(document.getElementById((i-1).toString() + "-" + (j+1).toString()).className == "notClicked") cellClick(i-1, j+1);
                if(document.getElementById((i-1).toString() + "-" + (j).toString()).className == "notClicked") cellClick(i-1, j);
            }
            else if(j==0){
                if(document.getElementById((i).toString() + "-" + (j+1).toString()).className == "notClicked") cellClick(i, j+1);
                if(document.getElementById((i-1).toString() + "-" + (j+1).toString()).className == "notClicked") cellClick(i-1, j+1);
                if(document.getElementById((i-1).toString() + "-" + (j).toString()).className == "notClicked") cellClick(i-1, j);
                if(document.getElementById((i+1).toString() + "-" + (j+1).toString()).className == "notClicked") cellClick(i+1, j+1);
                if(document.getElementById((i+1).toString() + "-" + (j).toString()).className == "notClicked") cellClick(i+1, j);
            }
            else if(j==currWidth-1){
                if(document.getElementById((i-1).toString() + "-" + (j).toString()).className == "notClicked") cellClick(i-1, j);
                if(document.getElementById((i+1).toString() + "-" + (j).toString()).className == "notClicked") cellClick(i+1, j);
                if(document.getElementById((i).toString() + "-" + (j-1).toString()).className == "notClicked") cellClick(i, j-1);
                if(document.getElementById((i-1).toString() + "-" + (j-1).toString()).className == "notClicked") cellClick(i-1, j-1);
                if(document.getElementById((i+1).toString() + "-" + (j-1).toString()).className == "notClicked") cellClick(i+1, j-1);
            }
            else{
                if(document.getElementById((i).toString() + "-" + (j-1).toString()).className == "notClicked") cellClick(i, j-1);
                if(document.getElementById((i).toString() + "-" + (j+1).toString()).className == "notClicked") cellClick(i, j+1);
                if(document.getElementById((i-1).toString() + "-" + (j-1).toString()).className == "notClicked") cellClick(i-1, j-1);
                if(document.getElementById((i-1).toString() + "-" + (j+1).toString()).className == "notClicked") cellClick(i-1, j+1);
                if(document.getElementById((i+1).toString() + "-" + (j-1).toString()).className == "notClicked") cellClick(i+1, j-1);
                if(document.getElementById((i+1).toString() + "-" + (j+1).toString()).className == "notClicked") cellClick(i+1, j+1);
                if(document.getElementById((i-1).toString() + "-" + (j).toString()).className == "notClicked") cellClick(i-1, j);
                if(document.getElementById((i+1).toString() + "-" + (j).toString()).className == "notClicked") cellClick(i+1, j);
            }
        }
        freeCells-=1;
        //console.log(freeCells);
        if(freeCells <= 0){
            console.log("win");
            for(var i=0; i<currHeight; i++){
                for(var j=0; j<currWidth; j++){
                    curr = (i).toString() + "-" + (j).toString();
                    cell = document.getElementById(curr);
                    if(document.getElementById(curr).classList.contains("notClicked")){
                        document.getElementById(curr).classList.remove("notClicked");
                        document.getElementById(curr).classList.add("clicked");
                    }
                }
            }
            document.getElementById("victory").textContent = "You won in " + clicks.toString() + " moves! Congrats :)";

        }
    }
    else{
        console.log("clicked " + curr);
        count = 0;
        countF = 0;
        //usx corner
        if(i==0 && j==0){
            if(document.getElementById((i).toString() + "-" + (j+1).toString()).className == "notClicked") count++;
            if(document.getElementById((i).toString() + "-" + (j+1).toString()).textContent == "F") countF++;
            if(document.getElementById((i+1).toString() + "-" + (j+1).toString()).className == "notClicked") count++;
            if(document.getElementById((i+1).toString() + "-" + (j+1).toString()).textContent == "F") countF++;
            if(document.getElementById((i+1).toString() + "-" + (j).toString()).className == "notClicked") count++;
            if(document.getElementById((i+1).toString() + "-" + (j).toString()).textContent == "F") countF++;
        }
        //udx corner
        else if(i==0 && j==currWidth-1){
            if(document.getElementById((i+1).toString() + "-" + (j-1).toString()).className == "notClicked") count++;
            if(document.getElementById((i+1).toString() + "-" + (j-1).toString()).textContent == "F") countF++;
            if(document.getElementById((i+1).toString() + "-" + (j).toString()).className == "notClicked") count++;
            if(document.getElementById((i+1).toString() + "-" + (j).toString()).textContent == "F") countF++;
            if(document.getElementById((i).toString() + "-" + (j-1).toString()).className == "notClicked") count++;
            if(document.getElementById((i).toString() + "-" + (j-1).toString()).textContent == "F") countF++;
        }
        //dsx corner
        else if(i==currHeight-1 && j==0){
            if(document.getElementById((i).toString() + "-" + (j+1).toString()).className == "notClicked") count++;
            if(document.getElementById((i-1).toString() + "-" + (j+1).toString()).className == "notClicked") count++;
            if(document.getElementById((i-1).toString() + "-" + (j).toString()).className == "notClicked") count++;
            if(document.getElementById((i).toString() + "-" + (j+1).toString()).textContent == "F") countF++;
            if(document.getElementById((i-1).toString() + "-" + (j+1).toString()).textContent == "F") countF++;
            if(document.getElementById((i-1).toString() + "-" + (j).toString()).textContent == "F") countF++;
        }
        //ddx corner
        else if(i==currHeight-1 && j==currWidth-1){
            if(document.getElementById((i-1).toString() + "-" + (j).toString()).className == "notClicked") count++;
            if(document.getElementById((i-1).toString() + "-" + (j-1).toString()).className == "notClicked") count++;
            if(document.getElementById((i).toString() + "-" + (j-1).toString()).className == "notClicked") count++;
            if(document.getElementById((i-1).toString() + "-" + (j).toString()).textContent == "F") countF++;
            if(document.getElementById((i-1).toString() + "-" + (j-1).toString()).textContent == "F") countF++;
            if(document.getElementById((i).toString() + "-" + (j-1).toString()).textContent == "F") countF++;
        }
        else if(i==0){
            if(document.getElementById((i).toString() + "-" + (j-1).toString()).className == "notClicked") count++;
            if(document.getElementById((i).toString() + "-" + (j+1).toString()).className == "notClicked") count++;
            if(document.getElementById((i+1).toString() + "-" + (j-1).toString()).className == "notClicked") count++;
            if(document.getElementById((i+1).toString() + "-" + (j).toString()).className == "notClicked") count++;
            if(document.getElementById((i+1).toString() + "-" + (j+1).toString()).className == "notClicked") count++;
            if(document.getElementById((i).toString() + "-" + (j-1).toString()).textContent == "F") countF++;
            if(document.getElementById((i).toString() + "-" + (j+1).toString()).textContent == "F") countF++;
            if(document.getElementById((i+1).toString() + "-" + (j-1).toString()).textContent == "F") countF++;
            if(document.getElementById((i+1).toString() + "-" + (j).toString()).textContent == "F") countF++;
            if(document.getElementById((i+1).toString() + "-" + (j+1).toString()).textContent == "F") countF++;
        }
        else if(i==currHeight-1){
            if(document.getElementById((i).toString() + "-" + (j-1).toString()).className == "notClicked") count++;
            if(document.getElementById((i).toString() + "-" + (j+1).toString()).className == "notClicked") count++;
            if(document.getElementById((i-1).toString() + "-" + (j-1).toString()).className == "notClicked") count++;
            if(document.getElementById((i-1).toString() + "-" + (j+1).toString()).className == "notClicked") count++;
            if(document.getElementById((i-1).toString() + "-" + (j).toString()).className == "notClicked") count++;
            if(document.getElementById((i).toString() + "-" + (j-1).toString()).textContent == "F") countF++;
            if(document.getElementById((i).toString() + "-" + (j+1).toString()).textContent == "F") countF++;
            if(document.getElementById((i-1).toString() + "-" + (j-1).toString()).textContent == "F") countF++;
            if(document.getElementById((i-1).toString() + "-" + (j+1).toString()).textContent == "F") countF++;
            if(document.getElementById((i-1).toString() + "-" + (j).toString()).textContent == "F") countF++;
        }
        else if(j==0){
            if(document.getElementById((i).toString() + "-" + (j+1).toString()).className == "notClicked") count++;
            if(document.getElementById((i-1).toString() + "-" + (j+1).toString()).className == "notClicked") count++;
            if(document.getElementById((i-1).toString() + "-" + (j).toString()).className == "notClicked") count++;
            if(document.getElementById((i+1).toString() + "-" + (j+1).toString()).className == "notClicked") count++;
            if(document.getElementById((i+1).toString() + "-" + (j).toString()).className == "notClicked") count++;
            if(document.getElementById((i).toString() + "-" + (j+1).toString()).textContent == "F") countF++;
            if(document.getElementById((i-1).toString() + "-" + (j+1).toString()).textContent == "F") countF++;
            if(document.getElementById((i-1).toString() + "-" + (j).toString()).textContent == "F") countF++;
            if(document.getElementById((i+1).toString() + "-" + (j+1).toString()).textContent == "F") countF++;
            if(document.getElementById((i+1).toString() + "-" + (j).toString()).textContent == "F") countF++;
        }
        else if(j==currWidth-1){
            if(document.getElementById((i-1).toString() + "-" + (j).toString()).className == "notClicked") count++;
            if(document.getElementById((i+1).toString() + "-" + (j).toString()).className == "notClicked") count++;
            if(document.getElementById((i).toString() + "-" + (j-1).toString()).className == "notClicked") count++;
            if(document.getElementById((i-1).toString() + "-" + (j-1).toString()).className == "notClicked") count++;
            if(document.getElementById((i+1).toString() + "-" + (j-1).toString()).className == "notClicked") count++;
            if(document.getElementById((i-1).toString() + "-" + (j).toString()).textContent == "F") countF++;
            if(document.getElementById((i+1).toString() + "-" + (j).toString()).textContent == "F") countF++;
            if(document.getElementById((i).toString() + "-" + (j-1).toString()).textContent == "F") countF++;
            if(document.getElementById((i-1).toString() + "-" + (j-1).toString()).textContent == "F") countF++;
            if(document.getElementById((i+1).toString() + "-" + (j-1).toString()).textContent == "F") countF++;
        }
        else{
            if(document.getElementById((i).toString() + "-" + (j-1).toString()).className == "notClicked") count++;
            if(document.getElementById((i).toString() + "-" + (j+1).toString()).className == "notClicked") count++;
            if(document.getElementById((i-1).toString() + "-" + (j-1).toString()).className == "notClicked") count++;
            if(document.getElementById((i-1).toString() + "-" + (j+1).toString()).className == "notClicked") count++;
            if(document.getElementById((i+1).toString() + "-" + (j-1).toString()).className == "notClicked") count++;
            if(document.getElementById((i+1).toString() + "-" + (j+1).toString()).className == "notClicked") count++;
            if(document.getElementById((i-1).toString() + "-" + (j).toString()).className == "notClicked") count++;
            if(document.getElementById((i+1).toString() + "-" + (j).toString()).className == "notClicked") count++;
            if(document.getElementById((i).toString() + "-" + (j-1).toString()).textContent == "F") countF++;
            if(document.getElementById((i).toString() + "-" + (j+1).toString()).textContent == "F") countF++;
            if(document.getElementById((i-1).toString() + "-" + (j-1).toString()).textContent == "F") countF++;
            if(document.getElementById((i-1).toString() + "-" + (j+1).toString()).textContent == "F") countF++;
            if(document.getElementById((i+1).toString() + "-" + (j-1).toString()).textContent == "F") countF++;
            if(document.getElementById((i+1).toString() + "-" + (j+1).toString()).textContent == "F") countF++;
            if(document.getElementById((i-1).toString() + "-" + (j).toString()).textContent == "F") countF++;
            if(document.getElementById((i+1).toString() + "-" + (j).toString()).textContent == "F") countF++;
        }
        //console.log("count: " + count);
        //console.log("countF: " + countF);
        if(count >= countF && countF.toString() == document.getElementById(curr).textContent){
            //console.log("sus");
            //usx corner
            if(i==0 && j==0){
                if(document.getElementById((i).toString() + "-" + (j+1).toString()).className == "notClicked") cellClick(i, j+1);
                if(document.getElementById((i+1).toString() + "-" + (j+1).toString()).className == "notClicked") cellClick(i+1, j+1);
                if(document.getElementById((i+1).toString() + "-" + (j).toString()).className == "notClicked") cellClick(i+1, j);
            }
            //udx corner
            else if(i==0 && j==currWidth-1){
                if(document.getElementById((i+1).toString() + "-" + (j-1).toString()).className == "notClicked") cellClick(i+1, j-1);
                if(document.getElementById((i+1).toString() + "-" + (j).toString()).className == "notClicked") cellClick(i+1, j);
                if(document.getElementById((i).toString() + "-" + (j-1).toString()).className == "notClicked") cellClick(i, j-1);
            }
            //dsx corner
            else if(i==currHeight-1 && j==0){
                if(document.getElementById((i).toString() + "-" + (j+1).toString()).className == "notClicked") cellClick(i, j+1);
                if(document.getElementById((i-1).toString() + "-" + (j+1).toString()).className == "notClicked") cellClick(i-1, j+1);
                if(document.getElementById((i-1).toString() + "-" + (j).toString()).className == "notClicked") cellClick(i-1, j);
            }
            //ddx corner
            else if(i==currHeight-1 && j==currWidth-1){
                if(document.getElementById((i-1).toString() + "-" + (j).toString()).className == "notClicked") cellClick(i-1, j);
                if(document.getElementById((i-1).toString() + "-" + (j-1).toString()).className == "notClicked") cellClick(i-1, j-1);
                if(document.getElementById((i).toString() + "-" + (j-1).toString()).className == "notClicked") cellClick(i, j-1);
            }
            else if(i==0){
                if(document.getElementById((i).toString() + "-" + (j-1).toString()).className == "notClicked") cellClick(i, j-1);
                if(document.getElementById((i).toString() + "-" + (j+1).toString()).className == "notClicked") cellClick(i, j+1);
                if(document.getElementById((i+1).toString() + "-" + (j-1).toString()).className == "notClicked") cellClick(i+1, j-1);
                if(document.getElementById((i+1).toString() + "-" + (j).toString()).className == "notClicked") cellClick(i+1, j);
                if(document.getElementById((i+1).toString() + "-" + (j+1).toString()).className == "notClicked") cellClick(i+1, j+1);
            }
            else if(i==currHeight-1){
                if(document.getElementById((i).toString() + "-" + (j-1).toString()).className == "notClicked") cellClick(i, j-1);
                if(document.getElementById((i).toString() + "-" + (j+1).toString()).className == "notClicked") cellClick(i, j+1);
                if(document.getElementById((i-1).toString() + "-" + (j-1).toString()).className == "notClicked") cellClick(i-1, j-1);
                if(document.getElementById((i-1).toString() + "-" + (j+1).toString()).className == "notClicked") cellClick(i-1, j+1);
                if(document.getElementById((i-1).toString() + "-" + (j).toString()).className == "notClicked") cellClick(i-1, j);
            }
            else if(j==0){
                if(document.getElementById((i).toString() + "-" + (j+1).toString()).className == "notClicked") cellClick(i, j+1);
                if(document.getElementById((i-1).toString() + "-" + (j+1).toString()).className == "notClicked") cellClick(i-1, j+1);
                if(document.getElementById((i-1).toString() + "-" + (j).toString()).className == "notClicked") cellClick(i-1, j);
                if(document.getElementById((i+1).toString() + "-" + (j+1).toString()).className == "notClicked") cellClick(i+1, j+1);
                if(document.getElementById((i+1).toString() + "-" + (j).toString()).className == "notClicked") cellClick(i+1, j);
            }
            else if(j==currWidth-1){
                if(document.getElementById((i-1).toString() + "-" + (j).toString()).className == "notClicked") cellClick(i-1, j);
                if(document.getElementById((i+1).toString() + "-" + (j).toString()).className == "notClicked") cellClick(i+1, j);
                if(document.getElementById((i).toString() + "-" + (j-1).toString()).className == "notClicked") cellClick(i, j-1);
                if(document.getElementById((i-1).toString() + "-" + (j-1).toString()).className == "notClicked") cellClick(i-1, j-1);
                if(document.getElementById((i+1).toString() + "-" + (j-1).toString()).className == "notClicked") cellClick(i+1, j-1);
            }
            else{
                if(document.getElementById((i).toString() + "-" + (j-1).toString()).className == "notClicked") cellClick(i, j-1);
                if(document.getElementById((i).toString() + "-" + (j+1).toString()).className == "notClicked") cellClick(i, j+1);
                if(document.getElementById((i-1).toString() + "-" + (j-1).toString()).className == "notClicked") cellClick(i-1, j-1);
                if(document.getElementById((i-1).toString() + "-" + (j+1).toString()).className == "notClicked") cellClick(i-1, j+1);
                if(document.getElementById((i+1).toString() + "-" + (j-1).toString()).className == "notClicked") cellClick(i+1, j-1);
                if(document.getElementById((i+1).toString() + "-" + (j+1).toString()).className == "notClicked") cellClick(i+1, j+1);
                if(document.getElementById((i-1).toString() + "-" + (j).toString()).className == "notClicked") cellClick(i-1, j);
                if(document.getElementById((i+1).toString() + "-" + (j).toString()).className == "notClicked") cellClick(i+1, j);
            }
        }
    }
}

function flag(curr){
    //console.log(curr);
    if(document.getElementById(curr).classList.contains("notClicked")){
        if(document.getElementById(curr).textContent == "F"){
            document.getElementById(curr).textContent = matrix[curr.split('-')[0]][curr.split('-')[1]];
            document.getElementById(curr).style.textIndent = "";
            switch(document.getElementById(curr).textContent){
                case '1':
                    cell.style.color = "blue";
                    break;
                case '2':
                    cell.style.color = "green";
                    break;
                case '3':
                    cell.style.color = "red";
                    break;
                case '4':
                    cell.style.color = "darkblue";
                    break;
                case '5':
                    cell.style.color = "darkred";
                    break;
                case '6':
                    cell.style.color = "turquoise";
                    break;
                case '7':
                    cell.style.color = "black";
                    break;
                case '8':
                    cell.style.color = "brown";
                    break;
            }
        }
        else{
            matrix[curr.split('-')[0]][curr.split('-')[1]] = document.getElementById(curr).textContent;
            document.getElementById(curr).textContent = "F";
            document.getElementById(curr).style.textIndent = "initial";
            document.getElementById(curr).style.color = "red";
            document.getElementById(curr).fontWeight = "600";
        }
    }
}
