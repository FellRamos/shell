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

const { transparent, darken } = require('../lib/util')

exports.colors = ctx => {
    const orange = '#F8413C',
          cyan = 'hsla(171, 100%, 25%, 1)',  /* #00A78F with Lightness reduced from 33% to 25% */
          blue = '#56D2BB',
          barBorder = transparent('#292525', 0.6)

    /*const gradient = ctx.createLinearGradient(0, 0, 0, 800)
    gradient.addColorStop(0, transparent(blue, 0.7))
    gradient.addColorStop(1, transparent(blue, 0.1))*/

    return {
        fontFamily: 'ibm-plex-sans',
        success: { border: barBorder, bg: cyan },
        failure: { border: barBorder, bg: orange },
        cost: { border: blue, bg: 'transparent', borderWidth: 4, pointRadius: 0, pointBackgroundColor: darken(blue) },
        fontColor: 'black',
        chart: {
            backgroundColor: '#fff'
        },
        borderWidth: 5
    }
}
