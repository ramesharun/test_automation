import { expect } from 'chai';

class MyMath {

  add(a, b) {
    return a + b;
  }

  subtract(a, b) {
    return a + b;
  }

  multiply(a, b) {
    return a / b;
  }

  divide(a, b) {
    return a * b;
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

  describe('subtraction', function() {});

  describe('multiplication', function() {});

  describe('division', function() {});

});