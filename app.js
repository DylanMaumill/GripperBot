const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var fs = require('fs');

function getHeight(platform){

}

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (request, response) =>  response.sendFile(`${__dirname}/Gripperbot.html`));

app.post('/api/data', (request, response) => {
	const postBody = request.body;
	console.log(postBody);
	var sixHeight = 0, fiveHeight = 0, fourHeight = 0, threeHeight = 0, twoHeight = 0, oneHeight = 0;
	var oneH = 1, twoH = 1, threeH = 1, fourH = 1;
	var out = "";
	//get the block locations
	var bOne = request.body.block1;
	var bTwo = request.body.block2;
	var bThree = request.body.block3;
	var bFour = request.body.block4;
	var bFive = request.body.block5;
	var bSix = request.body.block6;
	var goal = request.body.goal;
	//find the height of the sixth block
	if (bSix == 1){sixHeight = oneH; oneH++;}
	if (bSix == 2){sixHeight = twoH; twoH++;}
	if (bSix == 3){sixHeight = threeH; threeH++;}
	if (bSix == 4){sixHeight = fourH; fourH++;}
	//write line line to variable for the intial config file
	out += "initCellHasBlock(";
	out += sixHeight;
	out += ","
	out += bSix;
	out += ",6).\n"
	//find the height of the fifth block
	if (bFive == 1){fiveHeight = oneH; oneH++;}
	if (bFive == 2){fiveHeight = twoH; twoH++;}
	if (bFive == 3){fiveHeight = threeH; threeH++;}
	if (bFive == 4){fiveHeight = fourH; fourH++;}
	//write line line to variable for the intial config file
	out += "initCellHasBlock(";
	out += fiveHeight;
	out += ","
	out += bFive;
	out += ",5).\n"
	//find the height of the fourth block
	if (bFour == 1){fourHeight = oneH; oneH++;}
	if (bFour == 2){fourHeight = twoH; twoH++;}
	if (bFour == 3){fourHeight = threeH; threeH++;}
	if (bFour == 4){fourHeight = fourH; fourH++;}
	//write line line to variable for the intial config file
	out += "initCellHasBlock(";
	out += fourHeight;
	out += ","
	out += bFour;
	out += ",4).\n"
	//find the height of the third block
	if (bThree == 1){threeHeight = oneH; oneH++;}
	if (bThree == 2){threeHeight = twoH; twoH++;}
	if (bThree == 3){threeHeight = threeH; threeH++;}
	if (bThree == 4){threeHeight = fourH; fourH++;}
	//write line line to variable for the intial config file
	out += "initCellHasBlock(";
	out += threeHeight;
	out += ","
	out += bThree;
	out += ",3).\n"
	//find the height of the second block
	if (bTwo == 1){twoHeight = oneH; oneH++;}
	if (bTwo == 2){twoHeight = twoH; twoH++;}
	if (bTwo == 3){twoHeight = threeH; threeH++;}
	if (bTwo == 4){twoHeight = fourH; fourH++;}
	//write line line to variable for the intial config file
	out += "initCellHasBlock(";
	out += twoHeight;
	out += ","
	out += bTwo;
	out += ",2).\n"
	//find the height of the first block
	if (bOne == 1){oneHeight = oneH; oneH++;}
	if (bOne == 2){oneHeight = twoH; twoH++;}
	if (bOne == 3){oneHeight = threeH; threeH++;}
	if (bOne == 4){oneHeight = fourH; fourH++;}
	//write line line to variable for the intial config file
	out += "initCellHasBlock(";
	out += oneHeight;
	out += ","
	out += bOne;
	out += ",1).\n"
	//write the goal platform to the variable
	out += "goalPlatform(";
	out += goal;
	out += ").\n";

	console.log(out);

	//write the initial configuration to the initial_config.inp file
	fs.writeFile('initial_config.inp', '', function (err) {
  	if (err) throw err;
  		console.log('Done writing.');
	});

	fs.appendFile('initial_config.inp', out, function (err) {
  	if (err) throw err;
  		console.log('Writing configuration to file.');
	});

	//execute the clingo solver
	var exec = require('child_process').exec;
	exec("./clingo blocks_ASP_prog.lp initial_config.inp > out.inp", function(err, stdout){
		//execute the parser
		exec("./parser", function(err, stdout){
			//execute the node
			exec("./ls",function(err, data){
				console.log("This should execute last");
			});
		});
		console.log(stdout);
		console.log("Solver completed");
	});

	//redirect to new page
	response.sendFile(`${__dirname}/Gripperbot.html`)
});

app.listen(3000, () => console.info('Application running on port 3000'));
