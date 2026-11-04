import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Portfolio Content")
    .items([
      // Professional Profile
      S.listItem()
        .title("Professional Profile")
        .child(
          S.list()
            .title("Professional Profile")
            .items([S.documentTypeListItem("experience").title("Experience")]),
        ),

      // Project Classification
      S.listItem()
        .title("Project Classification")
        .child(
          S.list()
            .title("Project Classification")
            .items([
              S.documentTypeListItem("discipline").title("Disciplines"),
              S.documentTypeListItem("specialization").title("Specializations"),
              S.documentTypeListItem("technology").title("Technologies"),
              S.documentTypeListItem("skill").title("Skills"),
            ]),
        ),

      // Projects
      S.documentTypeListItem("project").title("All Projects"),
    ]);