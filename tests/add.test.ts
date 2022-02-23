// tests/demo.js
import { test } from 'uvu';
import * as assert from 'uvu/assert';
import fakeWindow from 'window';
import joro from '../src/index'

test('add() no tag no render', () => {
    const styles = new joro();
    const key = "HeaderComponent"
    const inner = `
        h1 { color: hotpink }
    `
    styles.add(key, inner, undefined, false)
    assert.is(styles.registry['HeaderComponent'], inner); 
});

test('add() tag, no render', () => {
    const window = new fakeWindow();
    const styles = new joro();
    const key = "HeaderComponent"
    const inner = `
        h1 { color: hotpink }
    `
    const tag = (window as Window).document.createElement('div');
    styles.add(key, inner, tag, false, 'head')
    assert.is(styles.registry['HeaderComponent'], inner);
});

test('add() tag, render', () => {
    global.window = (new fakeWindow() as any);
    global.document = global.window.document
    global.HTMLElement = global.window.HTMLElement
    const styles = new joro(window);
    const key = "HeaderComponent"
    const inner = `
        h1 { color: hotpink }
    `
    const tag = (window as Window).document.createElement('div');
    const result = styles.add(key, inner, tag, true)
    assert.is(styles.registry['HeaderComponent'], inner);
    assert.is(result, true);
});

test.run();