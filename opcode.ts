/// <reference path="typings/node.d.ts" />
var fs = require('fs');

export module VC {
    export class Opcode {
        constructor(public code:string, public numParams:number, public string:string, public params:string[]) {

        }

        public static read(path:string = 'scm.dat') {
            var lines:string[] = fs.readFileSync(path).toString().split(/[\n\r]+/);
            var rgx:RegExp = /^([\da-f]+)=(-?\d+),\s*(.*?)(?:;;.*?)?$/i;
            var result:any = {};

            lines.forEach((line) => {
                if (line[0] === '=')
                    return true;

                var parts:string[];
                if (parts = rgx.exec(line)) {
                    var opcode:string = parts[1];
                    var numParams = parseInt(parts[2]);
                    var str = parts[3];
                    var params:string[] = [];

                    for (var i = 1; i <= numParams; i++) {
                        var reg = new RegExp(`%${i}(\\w+(?::.+?)?)%`, 'g');
                        var match = reg.exec(str);
                        while (match != null) {
                            // matched text: match[0]
                            // match start: match.index
                            // capturing group n: match[n]

                            var type = match[1];

                            params.push(type);

                            match = reg.exec(str);
                        }
                    }

                    result[opcode] = new Opcode(opcode, numParams, str, params);
                } else {
                    throw line;
                }
            });
            return result;
        }
    }
}