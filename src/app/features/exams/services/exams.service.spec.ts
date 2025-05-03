import { TestBed } from "@angular/core/testing";
import { ExamsService } from "./exams.service"
import { HttpClientTestingModule, HttpTestingController, } from "@angular/common/http/testing"
import { Exam } from "../models/exam";
fdescribe("exam service", () => {
  let examService: ExamsService;
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ExamsService]
    })
    examService = TestBed.inject(ExamsService)
    httpTestingController = TestBed.inject(HttpTestingController)


  })
  it("is created", () => {
    expect(examService).toBeTruthy()
  })
  it("get Names", () => {
    let ex: Exam | undefined
    examService.getExams("100").subscribe(exam => {
      ex = exam
    })
    const req = httpTestingController.expectOne(`https://exam.elevateegy.com/api/v1/exams?subject=100`)
    req.flush({
      _id: "100",
      title: "title",
      duration: 25,
      subject: "my subject",
      numberOfQuestions: 25,
      active: true,
      createdAt: "string"

    })

    expect(ex).toEqual({
      _id: "100",
      title: "title",
      duration: 25,
      subject: "my subject",
      numberOfQuestions: 25,
      active: true,
      createdAt: "string"

    })
  })
})
