import { isNullOrUndefined } from 'util';

import { IOperation } from './index.d';
import { OperationStep } from './operation-step.model';

/**
 * Represents an operation that can be applied to a text.
 *
 * @export
 * @class Operation
 * @implements {IOperation}
 */
export class Operation implements IOperation {
    public steps: OperationStep[];

    /**
     * Creates an instance of Operation.
     *
     * @param {OperationStep[]} steps The steps in this operation.
     * @memberof Operation
     */
    constructor(steps: OperationStep[]) {
        if (!steps || steps.length === 0) {
            throw new Error('The steps cannot be null, undefined or empty.');
        }

        this.steps = steps;
    }

    /**
     * Combines a given operation with another given operation.
     *
     * @static
     * @param {IOperation} op1 The first operation.
     * @param {IOperation} op2 The second operation.
     * @returns {IOperation} The combined operation.
     * @memberof Operation
     */
    public static combine(op1: IOperation, op2: IOperation): IOperation {
        if (!op1 && !op2) {
            throw new Error('Both operations to be combined are null or undefined.');
        }

        if (!op1) {
            return op2;
        }

        if (!op2) {
            return op1;
        }

        op1.combine(op2);
        return op1;
    }

    /**
     * Combines a given operation with this operation.
     *
     * @param {IOperation} operation The operation to be combined with this one.
     * @memberof Operation
     */
    public combine(operation: IOperation): void {
        if (!operation) {
            throw new Error('The operation to be combined cannot be null or undefined.');
        }

        if (!operation.steps || operation.steps.length === 0) {
            return;
        }

        const totalMoves: number = this.steps
            .map((step: OperationStep) => step.move ? step.move : 0)
            .reduce((previous: number, current: number) => previous + current);

        operation.steps.forEach((step: OperationStep) => {
            const newStep = { ...step };
            if (isNullOrUndefined(newStep.move)) {
                newStep.move = 0;
            }

            newStep.move -= totalMoves;
            this.steps.push(newStep);
        });
    }

    /**
     * Applies this operation to a given text.
     *
     * @param {string} text The text to have this operation applied to.
     * @returns {string} The text after the operation has been applied.
     * @memberof Operation
     */
    public apply(text: string): string {
        let currentCaret = 0;
        this.steps.forEach((step: OperationStep) => {
            // Performs the move operation.
            currentCaret += step.move ? step.move : 0;

            // Performs the delete operation.
            text = text.substring(0, currentCaret) + text.substring(currentCaret + (step.delete ? step.delete : 0));

            // Performs the insert operation.
            text = text.substring(0, currentCaret) + step.insert + text.substring(currentCaret);
        });

        return text;
    }
}
