/// <reference path="typings/node.d.ts" />

var fs = require('fs');
var Reader = require('buffer-read');

import {VC} from "./opcode"

export class SCMParser {

    public reader:typeof Reader;

    constructor(public file:Buffer) {
        this.reader = new Reader(file);
    }

    public readOpcode() {

    }

    public parse() {
    }
}
