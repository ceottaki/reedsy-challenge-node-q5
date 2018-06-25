import { Operation } from '../index';
import { OperationStep } from '../operation-step.model';

describe('Operation', () => {
    it('should instantiate correctly', () => {
        const op = new Operation([{ move: 0 }]);
        expect(op).toBeTruthy();
    });

    it('should throw an error when instantiating with no steps', () => {
        expect(() => { const op = new Operation([]); }).toThrowError();
    });

    it('should combine two operations correctly, adjusting the steps of the second operation', () => {
        const op1 = new Operation([{ move: 2 }, { insert: 'FOO' }, { move: 1 }, { delete: 2 }]);
        const op2 = new Operation([{ move: 1 }, { insert: 'BAR' }, { move: -2 }, { insert: 'meh' }]);
        const result = Operation.combine(op1, op2);

        expect(result.steps[0].move === 2
            && result.steps[2].move === 1
            && result.steps[4].move === -2
            && result.steps[6].move === -5).toBe(true);
    });

    it('should combine with another operation correctly, adjusting the steps of the second operation', () => {
        const op1 = new Operation([{ move: 2 }, { insert: 'FOO' }, { move: 1 }, { delete: 2 }]);
        const op2 = new Operation([{ move: 1 }, { insert: 'BAR' }, { move: -2 }, { insert: 'meh' }]);
        op1.combine(op2);

        expect(op1.steps[0].move === 2
            && op1.steps[2].move === 1
            && op1.steps[4].move === -2
            && op1.steps[6].move === -5).toBe(true);
    });

    it('should insert characters at the correct position with a single step', () => {
        const op1 = new Operation([{ move: 2, insert: 'FOO' }]);
        const result = op1.apply('abcdefg');
        expect(result).toBe('abFOOcdefg');
    });

    it('should insert characters at the correct position with two steps, move and insert', () => {
        const op1 = new Operation([{ move: 2 }, { insert: 'FOO' }]);
        const result = op1.apply('abcdefg');
        expect(result).toBe('abFOOcdefg');
    });

    it('should remove characters at the correct position with a single step', () => {
        const op1 = new Operation([{ move: 3, delete: 2 }]);
        const result = op1.apply('abcdefg');
        expect(result).toBe('abcfg');
    });

    it('should remove characters at the correct position with two steps, move and delete', () => {
        const op1 = new Operation([{ move: 3 }, { delete: 2 }]);
        const result = op1.apply('abcdefg');
        expect(result).toBe('abcfg');
    });

    it('should insert and remove characters at the correct position with a single step, move, delete and insert', () => {
        const op1 = new Operation([{ move: 3, delete: 2, insert: 'FOO' }]);
        const result = op1.apply('abcdefg');
        expect(result).toBe('abcFOOfg');
    });

    it('should insert and remove characters at the correct position with four steps', () => {
        const op1 = new Operation([{ move: 3 }, { insert: 'FOO' }, { move: -5 }, { delete: 2 }]);
        const result = op1.apply('abcdefg');
        expect(result).toBe('aFOOdefg');
    });

    it('should combine two insert operations correctly, moving the caret forward with each insert', () => {
        const op1 = new Operation([{ move: 1 }, { insert: 'FOO' }]);
        const op2 = new Operation([{ move: 3 }, { insert: 'BAR' }]);

        op1.combine(op2);
        const result = op1.apply('abcdefg');
        expect(result).toBe('aFOObcBARdefg');
    });
});
