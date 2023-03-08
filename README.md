### Name:		Sathya Vemulapalli <br/>
### B-Number:	B00982820 <br/>
### Email:		svemulapalli@binghamton.edu or vsathya427@gmail.com

### [Project 2](https://github.com/VSathya427/i571/tree/main/submit/prj2-sol) : 

All test cases passed.

<img width="722" alt="Screenshot 2023-03-07 at 9 16 42 PM" src="https://user-images.githubusercontent.com/56964957/223602304-eb1467fa-4ef0-4634-ba49-f975deccbe25.png">

### [Project 1](https://github.com/VSathya427/i571/tree/main/submit/prj1-sol) :

All the test cases passed but getting some extraneous perl warnings(as shown below) while running the do-tests.sh file. <br>

<img width="844" alt="Screenshot 2023-02-16 at 1 06 52 AM" src="https://user-images.githubusercontent.com/56964957/219282410-0bfd5907-ac1e-4280-89b8-1300967f0877.png">

The grammar rules I used :

[Declaration] ::= "var" [Identifier] ":" [Type] ";" \* <br>
[Type] ::= "number" | "string" | "record" [FieldDeclarations] "end" <br>
[FieldDeclaration] ::= [Identifier] ":" [Type] ";"\* <br>
[Identifier] ::= ID


## [Reference Code](https://zdu.binghamton.edu/cs571/slides/syntax/code/arith/arith.mjs?lang=js)
