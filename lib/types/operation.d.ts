import { OperationStep } from '../operation-step.model';

/**
 * Defines properties and methods for an implementation of an operation that can be applied to a text.
 *
 * @export
 * @interface IOperation
 */
export interface IOperation {
    /**
     * Gets or sets the steps of the operation.
     *
     * @type {OperationStep[]}
     * @memberof IOperation
     */
    steps: OperationStep[];

    /**
     * When implemented it should combine a given operation with this operation.
     *
     * @param {IOperation} operation The operation to be combined with this one.
     * @memberof IOperation
     */
    combine(operation: IOperation): void;

    /**
     * When implemented it should apply this operation to a given text.
     *
     * @param {string} text The text to have this operation applied to.
     * @returns {string} The text after the operation has been applied.
     * @memberof IOperation
     */
    apply(text: string): string;
}
