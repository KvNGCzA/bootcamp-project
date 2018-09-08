import chai from 'chai';
import * as main from '../../public/js/main';
import * as signup from '../../public/js/signup-login';

const { assert } = chai;

const dashTitleResult1 = main.dashTitle('Test');
const dashTitleResult2 = main.dashTitle('Test Test');
const formatDateResult1 = signup.formatDate('2018-03-01');
const formatDateResult2 = signup.formatDate('2018-10-30YDS32');

describe('All fucntions test', () => {
    describe('dashTitle()', () => {
        it('dashTitle("Test") should return "test"', () => {
            assert.equal(dashTitleResult1, 'test');
        });
        it('dashTitle("Test") should return a string', () => {
            assert.typeOf(dashTitleResult1, 'string');
        });
        it('dashTitle("Test Test") should return "test-test"', () => {
            assert.equal(dashTitleResult2, 'test-test');
        });
        it('dashTitle("Test Test") should return a string', () => {
            assert.typeOf(dashTitleResult2, 'string');
        });     
    });
    describe('formatDate()', () => {
        it('formatDate("2018-03-01") should return "01 Mar 2018"', () => {
            assert.equal(formatDateResult1, '01 Mar 2018');
        });
        it('formatDate("2018-03-01") should return a string', () => {
            assert.typeOf(formatDateResult1, 'string');
        });
        it('formatDate("2018-10-30YDS32") should return "30 Oct 2018"', () => {
            assert.equal(formatDateResult2, '30 Oct 2018');
        });
        it('formatDate("2018-10-30YDS32") should return a string', () => {
            assert.typeOf(formatDateResult2, 'string');
        });     
    });
});