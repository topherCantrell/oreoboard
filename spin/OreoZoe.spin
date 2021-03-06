CON
  _clkmode        = xtal1 + pll16x
  _xinfreq        = 5_000_000

{{
           
}}

CON
    PIN_D1 = 15
    PIN_D2 = 14
    PIN_D3 = 13
    PIN_D4 = 12

OBJ    

    ZOEProc  : "ZoeProcessor"
    PST      : "Parallax Serial Terminal"
    PRG1     : "ProgramDataD1"
    PRG2     : "ProgramDataD2"
    PRG3     : "ProgramDataD3"
    PRG4     : "ProgramDataD4"      

var
    byte buffer[1024]
    
PUB Main | p1,p2,p3,p4

  ' Go ahead and drive the pixel data lines low.
  dira[PIN_D1] := 1
  outa[PIN_D1] := 0
  dira[PIN_D2] := 1
  outa[PIN_D2] := 0
  dira[PIN_D3] := 1
  outa[PIN_D3] := 0
  dira[PIN_D4] := 1
  outa[PIN_D4] := 0  
    
  ZOEProc.init(PRG1.getProgram)
  ZOEProc.init(PRG2.getProgram)
  ZOEProc.init(PRG3.getProgram)
  ZOEProc.init(PRG4.getProgram)

  p1 := PRG1.getProgram+4
  p2 := PRG2.getProgram+4
  p3 := PRG3.getProgram+4
  p4 := PRG4.getProgram+4 

  PauseMSec(1000)

  'PST.Start(115200) ' For programming port
  PST.StartRxTx(0,1,0,115200) ' roboRIO

  repeat
    PST.StrIn(@buffer)            ' Expected "[NAME]" with any CR/LF combo
    fireEvent(@buffer,p1)       ' Send ...
    fireEvent(@buffer,p2)       ' ... event to ...
    fireEvent(@buffer,p3)       ' ... all ...
    fireEvent(@buffer,p4)       ' ... processors
    'PST.char("A")

PRI fireEvent(buf,ptr) | p,c
  p:=ptr+1              ' Copy past the trigger
  repeat
    c := byte[buf]
    if c> 96
      c := c - 32
    byte[p] := c
    if byte[buf] == "]" ' Reached the terminator?
      byte[p+1] :=0     ' YES ... Terminate the buffer
      byte[ptr] :=1     ' YES ... Trigger the event
      return            ' YES ... Out
    p := p +1           ' NO ... increment ...
    buf := buf + 1      ' ... pointers
  
PRI PauseMSec(Duration)
  waitcnt(((clkfreq / 1_000 * Duration - 3932) #> 381) + cnt)  