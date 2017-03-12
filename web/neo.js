var NEO = (function() {
	
	var OFFS = [[0,-1],[1,0],[0,1],[-1,0]];
	
	var my = {};
			
	my.cursor = {}
	
	my.setCursor = function(x,y,strip,radius,gap,number) {		
		my.cursor.x = x;
		my.cursor.y = y;
		if(strip!==undefined) my.cursor.strip = strip;
		if(radius!==undefined) my.cursor.radius = radius;
		if(gap!==undefined) my.cursor.gap = gap;
		if(number!==undefined) my.cursor.number = number;
	};
	
	my.makeStrip = function(direction,length) {				
		
		var strips = $("#oreoZoe_D"+my.cursor.strip);
		var ox = OFFS[direction][0];
		var oy = OFFS[direction][1];	
		for(var z=0;z<length;++z) {		
			strips.append("<circle "+
					"id='S"+my.cursor.strip+"_"+(my.cursor.number)+"' "+
					"cx='"+(my.cursor.x)+"' "+
					"cy='"+(my.cursor.y)+"' "+
					"r='"+my.cursor.radius+"' "+
					"stroke='#E0E0E0' stroke-width='1' "+
					"fill='#F8F8F8'/>");
			my.cursor.x += ox*my.cursor.gap;
			my.cursor.y += oy*my.cursor.gap;
			++my.cursor.number;
		}
		$("#oreoZoe_D"+my.cursor.strip).html($("#oreoZoe_D"+my.cursor.strip).html());
	};
	
	my.setLED = function(stripNumber,number,color) {		
		$("#S"+stripNumber+"_"+number).attr("fill",color);
	};
	
	return my;

}());

function makeSquare(x,y,snum) {
	NEO.setCursor(x,y, 1,4,15,snum);
	NEO.makeStrip(1,22);
	NEO.setCursor(NEO.cursor.x-5,NEO.cursor.y+10);
	NEO.makeStrip(2,16);
	NEO.setCursor(NEO.cursor.x-10,NEO.cursor.y-5);
	NEO.makeStrip(3,22);
	NEO.setCursor(NEO.cursor.x+5,NEO.cursor.y-10);
	NEO.makeStrip(0,16);
}

makeSquare(20, 10,  0);
makeSquare(370,10,  76);
makeSquare(720,10, 152);

NEO.setCursor(10,10, 2,4,15,0);
for(var z=0;z<3;++z) {
	for(var y=0;y<8;++y) {
		NEO.setCursor(10+120*z,10+y*15);
		NEO.makeStrip(1,8);
	}
}

NEO.setCursor(10,10, 3,4,10,0);
NEO.makeStrip(1,20);
NEO.setCursor(NEO.cursor.x-10,NEO.cursor.y+10);
NEO.makeStrip(2,10);
NEO.setCursor(NEO.cursor.x,NEO.cursor.y);
NEO.makeStrip(3,20);

NEO.setCursor(450,10);
NEO.makeStrip(3,20);
NEO.setCursor(NEO.cursor.x+10,NEO.cursor.y+10);
NEO.makeStrip(2,10);
NEO.setCursor(NEO.cursor.x,NEO.cursor.y);
NEO.makeStrip(1,20);

var proc;

$("#run_D1").bind("click",function() {	
	proc = initZoeProcessor($("#oreoZoe_D1"),$("#code_D1").val());	
	proc.run();	
});

$("#stop_D1").bind("click",function() {	
	if(proc) {
		proc.stop();
	}
});

