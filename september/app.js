function foo(){
	console.log(this.a)
}
function active(fn){
	fn();
}
var a=20;
var obj={
	a:10,
	getA:foo
}
active(obj.getA);