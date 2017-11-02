/*
 * Copyright 2017 IBM Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const common = require('../../../lib/common'),
      ui = require('../../../lib/ui'),
      cli = ui.cli,
      {
          input,
          composerInput,
          verifyNodeExists,
          verifyNodeExistsById,
          verifyEdgeExists,
          verifyOutgoingEdgeExists,
          verifyNodeLabelsAreSane,
          verifyTheBasicStuff
      } = require('../../../lib/composer-viz-util')

// fuzz testing: eliminate auth
//    NOTE: since we have no wskprops, the expected API_HOST is going to be
//          a static default, hard-coded into openwhisk-core.js
const fuzz = { fuzz: { rules: ['noAuth'], prefs: { noAuthOk: true,
                                                   API_HOST: 'openwhisk.ng.bluemix.net' } } }

/**
 * Here starts the test
 *
 */
describe('show the composer visualization with no wskauth', function() {
    before(common.before(this, fuzz)) // fuzz testing: eliminate authentication bits
    after(common.after(this))

    it('should have an active repl', () => cli.waitForRepl(this.app, fuzz.fuzz.prefs))

    const cmd = 'app preview',
          hello = { file: 'hello.js', path: '@demos/hello.js' },
          If = composerInput('if.js'),
          whileSeq = composerInput('while-seq.js')

    /** test: load @demos/hello */
    it(`show visualization via ${cmd} from FSM file ${hello.path}`, () => cli.do(`${cmd} ${hello.path}`, this.app)
       .then(verifyTheBasicStuff(hello.file, 'composerLib'))
       .then(() => this.app.client.element('body.no-auth')) // make sure we have this indicator
       .catch(common.oops(this)))

    /** test: load an if.js */
    it(`show visualization via ${cmd} from FSM file ${If.file}`, () => cli.do(`${cmd} ${If.path}`, this.app)
       .then(verifyTheBasicStuff(If.file, 'composerLib'))
       .then(verifyNodeExists('seq1'))
       .then(verifyNodeExists('seq2'))
       .then(verifyNodeExists('seq3'))
       .then(verifyNodeExists('seq4'))
       .then(verifyNodeExists('seq5'))
       .then(verifyEdgeExists('seq1', 'seq2'))
       .then(verifyEdgeExists('seq2', 'seq3'))
       .then(verifyEdgeExists('seq4', 'seq5'))
       .then(() => this.app.client.element('body.no-auth')) // make sure we have this indicator
       .catch(common.oops(this)))

    /** test: while with nested sequence, from js file */
    it(`show visualization from javascript source ${whileSeq.path}`, () => cli.do(`app viz ${whileSeq.path}`, this.app)
       .then(verifyTheBasicStuff(whileSeq.file, 'composerLib'))
       .then(verifyNodeExists('seq1'))
       .then(verifyNodeExists('seq2'))
       .then(verifyNodeExists('seq3'))
       .then(verifyNodeExists('cond1'))
       .then(verifyNodeExists('cond2'))
       .then(verifyNodeExists('cond3'))
       .then(verifyNodeExists('action4'))
       .then(verifyEdgeExists('seq1', 'seq2'))
       .then(verifyEdgeExists('seq2', 'seq3'))
       .then(verifyEdgeExists('cond1', 'cond2'))
       .then(verifyEdgeExists('action4', 'cond3'))
       .then(() => this.app.client.element('body.no-auth')) // make sure we have this indicator
       .catch(common.oops(this)))
})
