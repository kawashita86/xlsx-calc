var XLSX_CALC = require('../');
var assert = require('assert');

describe('Bugs', function() {
    var workbook;
    beforeEach(function() {
        workbook = {
            Sheets: {
                Sheet1: {
                    A1: {},
                    A2: {
                        v: 7
                    },
                    C2: {
                        v: 1
                    },
                    C3: {
                        v: 1
                    },
                    C4: {
                        v: 2
                    },
                    C5: {
                        v: 3
                    },
                }
            }
        };
    });
    it('should consider the end of string', function() {
        workbook.Sheets.Sheet1.A1.f = 'IF($C$3<=0,"Tempo de Investimento Invalido",IF($C$3<=24,"x","y"))';
        workbook.Sheets.Sheet1.C3 = { v: 24 };
        XLSX_CALC(workbook);
        assert.equal(workbook.Sheets.Sheet1.A1.v, 'x');
    });
    it('should eval 10%', function() {
        workbook.Sheets.Sheet1.A1.f = '(B3*10%)/12';
        workbook.Sheets.Sheet1.B3 = { v: 120 };
        XLSX_CALC(workbook);
        assert.equal(workbook.Sheets.Sheet1.A1.v, 1);
    });
    it('should works', function() {
        workbook.Sheets.Sheet1.A1.f = '-1-2';
        workbook.Sheets.Sheet1.B1 = {f: '4^5'};
        workbook.Sheets.Sheet1.C1 = {v: 33};
        workbook.Sheets.Sheet1.A2 = {f: 'SUM(A1:C1)'};
        XLSX_CALC(workbook);
        assert.equal(workbook.Sheets.Sheet1.A2.v, 1054);
    });
});