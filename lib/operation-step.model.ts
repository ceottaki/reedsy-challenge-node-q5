/**
 * Represents a step in an operation.
 *
 * @export
 * @class OperationStep
 */
export class OperationStep {
    /**
     * The number of characters to advance the caret.
     *
     * @type {number}
     * @memberof OperationStep
     */
    public move?: number;

    /**
     * The string to be inserted at the caret.
     *
     * @type {string}
     * @memberof OperationStep
     */
    public insert?: string;

    /**
     * The number of characters to be deleted from the caret onwards.
     *
     * @type {number}
     * @memberof OperationStep
     */
    public delete?: number;
}
