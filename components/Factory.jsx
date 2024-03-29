/*!
 * Copyright 2015 Florian Biewald
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

var React = require('react');
var weaponElements = {
  'Knife': require('./Knife')
};


module.exports = {
  create: function(weapon) {
    if (!weapon) {
      return null;
    }

    if (!weaponElements[weapon.get('name')]) {
      throw new Error('Unknown weapon: ' + weapon.get('name'));
    }

    var WeaponElement = weaponElements[weapon.get('name')];

    return (
      <WeaponElement
      />
    );
  }
}
