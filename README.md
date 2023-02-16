Name:		Sathya Vemulapalli <br/>
B-Number:	B00982820 <br/>
Email:		svemulapalli@binghamton.edu or vsathya427@gmail.com

All the test cases passed but getting some extraneous perl warnings(as shown below) while running the do-tests.sh file.

<img width="844" alt="Screenshot 2023-02-16 at 1 06 52 AM" src="https://user-images.githubusercontent.com/56964957/219282410-0bfd5907-ac1e-4280-89b8-1300967f0877.png">

The grammar rules I used :

" <Declaration> ::= "var" <Identifier> ":" <Type> ";"* "
" <Type> ::= "number" | "string" | "record" <FieldDeclarations> "end" "
" <FieldDeclaration> ::= <Identifier> ":" <Type> ";"* "
" <Identifier> ::= ID "

## [Reference Code](https://zdu.binghamton.edu/cs571/slides/syntax/code/arith/arith.mjs?lang=js)
