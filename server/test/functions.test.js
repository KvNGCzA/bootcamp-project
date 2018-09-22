import chai from 'chai';

import { validateEmail, validateWord } from '../utils/utils';

const assert = chai.assert;

describe('validateEmail()', () => {
    it('should return true', () => {
        assert.equal(validateEmail('chris@yahoo.com'), true);
    });
    it('should return false', () => {
        assert.equal(validateEmail('chrisyahoocom'), false);
    });
    it('should return false', () => {
        assert.equal(validateEmail('chris@yahoocom'), false);
    });
    it('should return type boolean', () => {
        assert.typeOf(validateEmail('chris@yahoo.com'), 'boolean');
    });    
});

describe('validateWord()', () => {
    it('should return true', () => {
        assert.equal(validateWord('chriscom'), true);
    });
    it('should return false', () => {
        assert.equal(validateWord(2), false);
    });
    it('should return false', () => {
        assert.equal(validateWord('chris@yahoocom'), false);
    });
    it('should return type boolean', () => {
        assert.typeOf(validateWord('sdasd'), 'boolean');
    });    
});