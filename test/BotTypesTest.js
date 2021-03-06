/**
 * Created by manthanhd on 17/10/2016.
 */
const expect = require('expect');

describe('Message', function() {
    const Message = require("../lib/BotTypes").Message;

    it("throws TypeError when initialised with type attribute as array", function(done) {
        try {
            new Message([]);
            done('should have failed');
        } catch (e) {
            expect(e).toBeA(TypeError);
            done();
        }
    });

    it('creates a new instance of Message when passed valid parameters', function(done) {
        var message = new Message('SingleLine', 'Hello World!');
        expect(message).toExist();
        expect(message.type).toBe('SingleLine');
        expect(message.content).toBe('Hello World!');
        done();
    });
});

describe('SingleLineMessage', function() {
    const SingleLineMessage = require("../lib/BotTypes").SingleLineMessage;

    it('creates a new instance of Message when passed valid parameters', function(done) {
        var message = new SingleLineMessage('Hello World!');
        expect(message).toExist();
        expect(message.type).toBe('SingleLine');
        expect(message.content).toBe('Hello World!');
        done();
    });
});

describe('MultiLineMessage', function() {
    const MultiLineMessage = require("../lib/BotTypes").MultiLineMessage;

    it("throws TypeError when initialised with content attribute as string", function(done) {
        try {
            new MultiLineMessage('');
            done('should have failed');
        } catch (e) {
            expect(e).toBeA(TypeError);
            done();
        }
    });

    it('creates a new instance of Message when passed valid parameters', function(done) {
        var message = new MultiLineMessage(['Hello World!']);
        expect(message).toExist();
        expect(message.type).toBe('MultiLine');
        expect(message.content.length).toBe(1);
        expect(message.content[0]).toBe('Hello World!');
        done();
    });
});

describe('Correspondence', function() {
    const Message = require('../lib/BotTypes').Message;
    const Correspondence = require("../lib/BotTypes").Correspondence;

    it("throws TypeError when initialised with message attribute as array", function(done) {
        try {
            new Correspondence(123, []);
            done('should have failed');
        } catch (e) {
            expect(e).toBeA(TypeError);
            done();
        }
    });

    it('creates a new instance of Correspondence when passed valid parameters', function(done) {
        var correspondence = new Correspondence('abcde12345', new Message('SingleLine', 'Hello World!'));
        expect(correspondence).toExist();
        expect(correspondence.id).toBe('abcde12345');
        expect(correspondence.message).toExist();
        expect(correspondence.message.type).toBe('SingleLine');
        expect(correspondence.message.content).toBe('Hello World!');
        done();
    });
});

describe('Context', function() {
    const Context = require("../lib/BotTypes").Context;

    it("throws TypeError when initialised with undefined id field", function(done) {
        try {
            new Context();
            done('should have failed');
        } catch (e) {
            expect(e).toBeA(TypeError);
            done();
        }
    });

    it('creates a new instance of Context when passed valid parameters', function(done) {
        var context = new Context(123);
        expect(context).toExist();
        expect(context.id).toBe(123);
        done();
    });
});

describe('TrainingDocument', function() {
    const TrainingDocument = require('../lib/BotTypes').TrainingDocument;

    it("throws TypeError when initialised with undefined values", function(done) {
        try {
            new TrainingDocument();
            done('should have failed');
        } catch (e) {
            expect(e).toBeA(TypeError);
            done();
        }
    });

    it('throws type error when topic parameter is not string', function(done) {
        try {
            new TrainingDocument([], '');
            done('should have failed');
        } catch (e) {
            expect(e).toBeA(TypeError);
            done();
        }
    });

    it('throws type error when text parameter is not string', function(done) {
        try {
            new TrainingDocument('', []);
            done('should have failed');
        } catch (e) {
            expect(e).toBeA(TypeError);
            done();
        }
    });

    it('returns a new TrainingDocument object when initialised with valid parameters', function() {
        var trainingDocument = new TrainingDocument('topic', 'text');
        expect(trainingDocument).toExist();
        expect(trainingDocument.topic).toBe('topic');
        expect(trainingDocument.text).toBe('text');
    });
});

describe('Skill', function() {
    const Skill = require('../lib/BotTypes').Skill;

    it('throws TypeError when name parameter is not string', function(done) {
        try {
            new Skill([], 'mytopic', function(){});
            done('should have failed');
        } catch (e) {
            expect(e).toBeA(TypeError);
            done();
        }
    });

    it('throws TypeError when topic parameter is undefined', function(done) {
        try {
            new Skill('name', undefined);
            done('should have failed');
        } catch (e) {
            expect(e).toBeA(TypeError);
            done();
        }
    });

    it('throws TypeError when topic parameter is not string', function(done) {
        try {
            new Skill('name', []);
            done('should have failed');
        } catch (e) {
            expect(e).toBeA(TypeError);
            done();
        }
    });

    it('throws TypeError when skillFn parameter is undefined', function(done) {
        try {
            new Skill('name', '', undefined);
            done('should have failed');
        } catch (e) {
            expect(e).toBeA(TypeError);
            done();
        }
    });

    it('throws TypeError when skillFn parameter is not string', function(done) {
        try {
            new Skill('name', '', []);
            done('should have failed');
        } catch (e) {
            expect(e).toBeA(TypeError);
            done();
        }
    });

    it('returns new Skill object when parameters are valid', function(done) {
        const skillFn = function(context, req, res, next) {

        };
        var skill = new Skill('name', 'topic', skillFn);

        expect(skill.topic).toBe('topic');
        expect(skill.apply).toBe(skillFn);
        done();
    });
});