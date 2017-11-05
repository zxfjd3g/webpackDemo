import $ from 'jquery'
import {cube} from "./math"
import lessons from './assets/json/lessons.json'
import './assets/css/style.css'

console.log(cube(3))
$(function () {
  const $app = $('#app')
  const $ul = $('<ul>')
  $app.append($ul)
  lessons.forEach(lesson => {
    $ul.append(`<li>课程名: ${lesson.name}, 时间: ${lesson.days}天</li>`)
  })
})