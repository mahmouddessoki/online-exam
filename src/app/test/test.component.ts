import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-test',
  imports: [],
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss',
  animations: [
    trigger("divStat", [
      state("normal", style({
        "backgroundColor": "red",
        "transform": "translateX(0px)"
      })),
      state("highlighted", style({
        "backgroundColor": "blue",
        "transform": "translateX(100px)"
      })),
      transition("normal <=> highlighted", animate(1000)),
      // transition("highlighted => normal" , animate(2000))
    ]),
    trigger("extraStat", [
      state("normal", style({
        "backgroundColor": "red",
        "transform": "translateX(0px) scale(1)"
      })),
      state("highlighted", style({
        "backgroundColor": "tomato",
        "transform": "translateX(100px) scale(1)"
      })),
      state("shrink", style({
        "backgroundColor": "tomato",
        "transform": "translateX(100px) scale(0.5)"
      })),
      transition("normal <=> highlighted", animate(1000)),
      transition("shrink <=> *", [
        style({
          "backgroundColor": "#09c"
        }),
        animate(500, style({
          "borderRadius": "50px"
        })),
        animate(500)
      ]),
      // transition("highlighted => normal", animate(2000))
    ]),
    trigger("list", [
      state("in", style({
        "opacity": 1,
        "transform": "translateX(0px)"
      })),
      transition("void => *", [
        style({
          "opacity": 0,
          "transform": "translateX(-100px)"
        }),
        animate(1000)
      ]),
      transition("* => void", [

        animate(1000, style({
          "opacity": 0,
          "transform": "translateX(-100px)"
        }))
      ]),

    ])
  ]
})
export class TestComponent {

  state = "normal"
  extraState = "normal"
  items: string[] = ["ahmed", "mahmoud", "ali"]
  items2: string[] = ["ahmed", "mahmoud", "ali"]


  changeState() {
    this.state = this.state == "normal" ? "highlighted" : "normal"
    this.extraState = this.extraState == "normal" ? "highlighted" : "normal"

  }


  onShrink() {
    this.extraState = "shrink"
  }

  addItem(item: string) {
    this.items.push(item)
  }
  removeItem(item: string) {
    this.items = this.items.filter(i => i != item)
  }
  add(item: string) {
    this.items2.push(item)
  }
  remove(item: string, el: HTMLLIElement) {

    el.classList.add("hide")
    // setTimeout(()=>{
      this.items2 = this.items2.filter(i => i != item)
    // },1000)
  }
}
