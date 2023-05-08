import { deepAssign, isNullorUndefined } from './util';
import expect from "expect.js";

describe("deepAssign", () => {
    it("equivalent for a shallow assign", () => {
        const A = { abc: 123, def: "ghi" };
        const da = deepAssign({}, A);
        const oa = Object.assign({}, A);
        expect(A).to.eql(da);
        expect(A).to.eql(oa);
        expect(A).not.to.be(da);
        expect(A).not.to.be(oa);
    });
    it("Updates an existing object", () => {
        const A = { abc: 123, def: "ghi" };
        const B = { def: "zzz", jkl: 456 };
        deepAssign(B, A);
        expect(A).not.to.eql(B);
        expect(B).to.eql({ abc: 123, def: "ghi", jkl: 456 });
    });
    it("Ignores undefined source objects", () => {
        const A = { abc: 123, def: "ghi" };
        deepAssign(A, undefined);
        expect(A).to.eql({ abc: 123, def: "ghi" });
    });
    it("Can apply multiple objects", () => {
        const A = {};
        const B = { abc: 123 };
        const C = { def: "ghi" };
        const D = { jkl: 456 };
        deepAssign(A, B, C, D);
        expect(A).not.to.eql(B);
        expect(A).not.to.eql(C);
        expect(A).not.to.eql(D);
        expect(B).not.to.eql(C);
        expect(B).not.to.eql(D);
        expect(C).not.to.eql(D);
        expect(A).to.eql({ abc: 123, def: "ghi", jkl: 456 });
    });
    it("Returns the target", () => {
        const A = {};
        const B = deepAssign(A, {});
        expect(A).to.eql(B);
    });
    it("Arrays are copied shallowly", () => {
        const A = { abc: [1, 2, 3] };
        const B = { abc: [1, 2] };
        const C = deepAssign({}, A, B);
        expect(C).to.eql({ abc: [1, 2] });
    })
});
describe("isNullOrUndefined", () => {
    it("true for null or undefined", () => {
        expect(isNullorUndefined(null)).to.eql(true);
        expect(isNullorUndefined(undefined)).to.eql(true);
    });
    it("false for other falsy values", () => {
        expect(isNullorUndefined(false)).to.eql(false);
        expect(isNullorUndefined("")).to.eql(false);
        expect(isNullorUndefined(0)).to.eql(false);
    });
});