import { expect } from 'chai';

class MyMath {

  add(a, b) {
    return a + b;
  }

  subtract(a, b) {
    return a - b;
  }

  multiply(a, b) {
    return a * b;
  }

  divide(a, b) {
    return a / b;
  }

}

describe('MyMath Tests', function() {

  let math;

  beforeEach(function() {
    math = new MyMath();
  });

  describe('addition', function() {
    it('should add two positive numbers', function() {
      expect(math.add(2, 2)).to.eql(4);
    });
    it('should add two negative numbers', function() {
      expect(math.add(-2, -2)).to.eql(-4);
    });
  });

  describe('subtraction', function() {
    it('should subtract two positive numbers', function() {
      expect(math.subtract(3, 1)).to.eql(2);
    });
    it('should subtract two negative numbers', function() {
      expect(math.subtract(-2, -2)).to.eql(0);
    });
  });

  describe('multiplication', function() {
    it('should multiply two positive numbers', function() {
      expect(math.multiply(3, 5)).to.eql(15);
    });
    it('should multiple two negative numbers', function() {
      expect(math.multiply(-2, -6)).to.eql(12);
    });
  });

  describe('division', function() {
    it('should divide two positive numbers', function() {
      expect(math.divide(15, 3)).to.eql(5);
    });
    it('should divide two negative numbers', function() {
      expect(math.divide(-20, -5)).to.eql(4);
    });
  });

});