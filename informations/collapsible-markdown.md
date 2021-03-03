## Example Collapsible Content
### Style 1

<table ><tbody ><tr></tr><tr><td><details ><summary><sub><b>Click to see more:</b></sub><h6> Given the following python code </h6>

```python
from pychartjs import BaseChart

class myChart(BaseChart):
    pass
chartJSON = myChart().get()

```
</summary><hr>
<h6>Write the following HTML</h6>

 ```html
<div class="container">
    <canvas id="myChart"></canvas>
</div>
```
<h6>... and JS</h6>

```js
var data = {{ chartJSON | safe }}
var ctx = document.getElementById("myChart").getContext('2d');
var myChart = new Chart(ctx, data);
```
</details></td></tr></tbody>
</table>

### Style 2
<table ><tbody ><tr><td><details ><summary><sub><b>Click to see more:</b></sub><h6> Given the following python code </h6>

```python
from pychartjs import BaseChart

class myChart(BaseChart):
    pass
chartJSON = myChart().get()

```
</summary><hr>
<h6>Write the following HTML</h6>

 ```html
<div class="container">
    <canvas id="myChart"></canvas>
</div>
```
<h6>... and JS</h6>

```js
var data = {{ chartJSON | safe }}
var ctx = document.getElementById("myChart").getContext('2d');
var myChart = new Chart(ctx, data);
```
</details></td></tr></tbody>
</table>


#### Notes
- All code block starter lines, e.g. ` ```python ` must be preceded by a blank space. 
- The closing block ` ``` ` tag must be followed by a newline. 
- The difference between `Style 1` and `Style 2` is a blank `<tr></tr> tag at the start of the table body
