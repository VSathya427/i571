function scan(str) {
  const toks = [];
  let s = str.replace(/#.*/g, ''); // remove comments
  s = s.replace(/\s+/g, ''); // remove whitespace
  // s = s.replace('record','record;')
  while (s.length > 0) {
    let m = null;
    if (s.match(/^var/)) {
      m = s.match(/^var/);
      toks.push(new Token('VAR', m[0]));
      s = s.slice(m[0].length);
      m = s.match(/^\w+/); // match the variable name
      if (m) {
        toks.push(new Token('ID', m[0]));
        s = s.slice(m[0].length);
      } else {
        throw new Error('Variable name expected after "var" keyword');
      }
    }
    else if(m = s.match(/^end/)){
        toks.push(new Token('END',m[0]));
        s = s.slice(m[0].length);
    }
    else if(m = s.match(/^record/)){
        toks.push(new Token('RECORD',m[0]));
        s = s.slice(m[0].length);
    }
    else if (s.match(/^[a-zA-Z_]\w*/)) { // modify identifier matching regex
      m = s.match(/^[a-zA-Z_]\w*/);
      let keyword = m[0];
      if (['number', 'string'].includes(keyword)) {
        toks.push(new Token(keyword.toUpperCase(),m[0]));
      } 
      else {
        toks.push(new Token('ID',m[0]));
      }
      s = s.slice(m[0].length);
    } 
    else if (s.match(/^:/)) {
      m = s.match(/^:/);
      toks.push(new Token(':',m[0]));
      s = s.slice(m[0].length);
    } 
    else if (s.match(/^;/)) {
      m = s.match(/^;/);
      toks.push(new Token(';',m[0]));
      s = s.slice(m[0].length);
    } 
    else {
      throw new Error('Unexpected token: ' + s);
    }
  }
  return toks;
}

class Token {
  constructor(kind, lexeme) {
    Object.assign(this, {kind, lexeme});
  }
}
inp = "var a: number;\n"+
    "var pt: record\n" +
      "x: number;\n"+
      "y: number;\n"+
    "end;\n";
inp3 = "var pt: record\n" +
      "x: number;\n"+
      "y: number;\n"+
    "end;\n";
input = "var a: number; #......."
inz = "var\n"+"single33\n"+":\n"+"string #some comment\n"+"#another comment\n"+"  ;";
inp2 = "var personPosition : record\n" +
               "  name: record\n" +
               "    firstName: string;\n" +
               "    lastName: string;\n" +
               "  end;\n" +
               "  position: record\n" +
               "    x: number;\n" +
               "    y: number;\n" +
               "    z: number;\n" +
               "  end;\n" +
               "end;"

class Parser {
  constructor(tokens) {
    this._tokens = tokens;
    this._index = 0;
    this.tok = this._nextToken(); //lookahead
  }

  //wrapper used for crude  error recovery
  parse() {
    try {
      let result = this.parseLo();
      if (!this.peek('EOF')) {
 	 const msg = `expecting end-of-input at "${this.tok.lexeme}"`;
  	 throw new SyntaxError(msg);
      }
      return result;
    }
    catch (err) {
        process.exit(1);
	console.error(err, err.stack);
	return err;
    }
  }

  peek(kind) {
    return this.tok.kind === kind;
  }
  
  consume(kind) {
    if (this.peek(kind)) {
      this.tok = this._nextToken();
    }
    else {
      const msg = `expecting ${kind} at "${this.tok.lexeme}"`;
      throw new SyntaxError(msg);
    }
  }

  _nextToken() {
    if (this._index < this._tokens.length) {
      return this._tokens[this._index++];
    }
    else {
      return new Token('EOF', '<EOF>');
    }
  }
  
} //Parser
const result= [];
class Parse extends Parser{
  constructor(expr){
    super(expr);
  }
  parseLo(){
    return this.Declaration();
  }

// <Declaration> ::= "var" <Identifier> ":" <Type> ";"*
// <Type> ::= "number" | "string" | "record" <FieldDeclarations> "end"
// <FieldDeclaration> ::= <Identifier> ":" <Type> ";"*
// <Identifier> ::= ID
  Declaration(){
    const tok = this.tok.kind;
    this.consume("VAR");
    let i = this.Identifier();
    this.consume(":");
    let t = this.Type(i);
    //this.consume(";");
    //console.log(t);
    result.push([i, t])
    JSON.stringify(result);
    if(!this.peek('EOF')){
      this.Declaration();
    }
    else{
      this.consume('EOF');
    }
  }
   Type(identi){
    if(this.peek("NUMBER")){
      this.consume("NUMBER");
      this.consume(";");
      return "number";
    }
    else if(this.peek("STRING")){
      this.consume("STRING");
      this.consume(";");
      return "string";
    } 
    else if(this.peek("RECORD")){
      this.consume("RECORD");
      let add2 = [];
      while(!this.peek("END")){
        let field = this.FieldDeclare();
        add2.push(field);
      }
      //console.log(field)
      //console.log(identi)
      this.consume("END");
      this.consume(";");
      if(add2.length === 0){
      	process.exit(1);
      }
      return add2;
    }
    else{
	console.error("damn");
	process.exit(1);
    }
  }
  // FieldDeclare(){
  //   while(!this.peek('END') && !this.peek('EOF')){
  //     let i = this.Identifier();
  //     this.consume("ID");
  //     this.consume(":");
  //     let t = this.Type(i);
  //     add.push([i,t])    
  //   }
  //   return add
  // }
FieldDeclare(){
    let add = []
    let i = this.Identifier();
    this.consume(":");
    let t = this.Type(i);
    add.push(i,t);
    return add
  }
  Identifier(){
    let id = this.tok.lexeme;
    this.consume("ID");
    return id;
  }
}
//scanned = scan(inp2);
//res = new Parse(scanned).parse();
//console.log(JSON.stringify(result,null, "\t"));
//console.log(result);

function run(){
     const fs = require('fs');
     const file = "file.txt";
     const data = fs.readFileSync(file,"utf8");
     scanned = scan(data);
     if(scanned == ""){
	console.log("[]");
     }
     res = new Parse(scanned).parse();
     console.log(JSON.stringify(result,null, "\t"));
}
run();
