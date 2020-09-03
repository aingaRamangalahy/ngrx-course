import { Injectable } from "@angular/core";
import { Actions } from "@ngrx/effects";
import { createEffect, ofType } from "@ngrx/effects";

import { CoursesActions} from "./action-types";
import { CoursesHttpService } from "./services/courses-http.service";
import { concatMap, map } from "rxjs/operators";
import { allCoursesLoaded } from "./course.action";


@Injectable()
export class CoursesEffects {
  loadCourses$ = createEffect(
    () => this.actions$
      .pipe(
        ofType(CoursesActions.loadAllCourses),
        concatMap(action => this.coursesHttpService.findAllCourses()),
        map(courses => allCoursesLoaded({courses}))
      )
  )

  saveCourses$ = createEffect(
    () => this.actions$
      .pipe(
        ofType(CoursesActions.courseUpdated),
        concatMap(action => this.coursesHttpService.saveCourse(
          action.update.id,
          action.update.changes
        ))
      ), {dispatch: false}
  )

  constructor(private actions$: Actions, private coursesHttpService: CoursesHttpService) {}
}