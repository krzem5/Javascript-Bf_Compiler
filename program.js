class Program{
	_loop(rd,rdc){
		while (this._end<1){
			var l=this.step(rd,rdc);
			var st=l[0];
			rdc=l[1];
			rd=false;
			if (st==1){
				var ths=this;
				requestAnimationFrame(function(){
					ths._loop(true,0);
				});
				return;
			}
			if (st==2){
				break;
			}
		}
		this._end=2;
	}



	constructor(prog){
		this.prog=prog;
		this.ptr=0;
		this.pidx=0;
		this._end=0;
		this.mem=new Uint8Array(10000);
	}



	step(rd,rdc){
		while (!"><+-.,[]".includes(this.prog[this.pidx])){
			this.pidx++;
			if (this.pidx==this.prog.length){
				this._end=1;
				return;
			}
		}
		var ch=this.prog[this.pidx];
		if (rdc>50000){
			return [1,null];
		}
		if (rd==false&&ch==","){
			return [1,null];
		}
		rdc++;
		var est=0;
		switch (ch){
			case ">":
				this.ptr++;
				break;
			case "<":
				this.ptr--;
				break;
			case "+":
				this.mem[this.ptr]++;
				break;
			case "-":
				this.mem[this.ptr]--;
				break;
			case ".":
				otpe.innerHTML+=String.fromCharCode(this.mem[this.ptr]).split("\n").join("<br>");
				otpe.style.overflowX=(otpe.scrollWidth-otpe.getBoundingClientRect().width==0?"hidden":"scroll");
				otpe.style.overflowY=(otpe.scrollHeight-otpe.getBoundingClientRect().height==0?"hidden":"scroll");
				otpe.scroll(0,otpe.scrollHeight);
				break;
			case ",":
				var t=window.prompt("Input:","");
				if (t==null){
					return [2,null];
				}
				while (t.length!=1){
					t=window.prompt("Input:","");
					if (t==null){
						return [2,null];
					}
				}
				this.mem[this.ptr]=t.codePointAt(0);
				est=1;
				break;
			case "[":
				if (this.mem[this.ptr]==0){
					var b=1;
					while (b>0){
						this.pidx++;
						if (this.pidx==this.prog.length){
							return [2,null];
						}
						if (this.prog[this.pidx]=="["){
							b++;
						}
						if (this.prog[this.pidx]=="]"){
							b--;
						}
					}
				}
				break;
			case "]":
				if (this.mem[this.ptr]!=0){
					var b=1;
					while (b>0){
						this.pidx--;
						if (this.pidx<0){
							return [2,null];
						}
						if (this.prog[this.pidx]=="["){
							b--;
						}
						if (this.prog[this.pidx]=="]"){
							b++;
						}
					}
				}
				break;
		}
		this.pidx++;
		if (this.pidx==this.prog.length){
			this._end=1;
		}
		return [est,rdc];
	}



	start(){
		otpe.innerHTML="";
		this._loop(true,0);
	}



	stop(){
		if (this._end==2){
			return;
		}
		this._end=1;
	}
}