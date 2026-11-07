import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import StackIcon from "tech-stack-icons";
import { siteConfig } from "../src/config/site.ts";

function data(path) {
  return JSON.parse(readFileSync(new URL(path, import.meta.url), "utf8"));
}

const projects = data("../src/data/projects/projectsData.json");
const skills = data("../src/data/skills/skillsData.json");
const publicRoot = new URL("../public/", import.meta.url);

test("project content has unique titles, complete descriptions, and working local assets", () => {
  assert.equal(
    new Set(projects.map((project) => project.title)).size,
    projects.length,
  );
  for (const project of projects) {
    assert.ok(project.title.trim());
    assert.ok(project.description.trim());
    assert.ok(project.category.trim());
    assert.ok(project.tags.length > 0);
    assert.ok(
      project.tags.every((tag) => typeof tag === "string" && tag.trim()),
    );
    if (project.link)
      assert.ok(["https:", "http:"].includes(new URL(project.link).protocol));
    if (project.image)
      assert.ok(
        existsSync(new URL(project.image.slice(1), publicRoot)),
        project.image,
      );
  }
});

test("every skill belongs to a displayed category and renders a real icon", () => {
  const categories = new Set(["frontend", "styling", "backend", "database"]);
  assert.equal(new Set(skills.map((skill) => skill.name)).size, skills.length);
  for (const skill of skills) {
    assert.ok(categories.has(skill.category), skill.label);
    assert.ok(skill.label.trim());
    const markup = renderToStaticMarkup(
      React.createElement(StackIcon, { name: skill.name, variant: "dark" }),
    );
    assert.ok(markup.includes("<svg"), skill.name);
  }
});

test("shared links and downloadable CV are valid", () => {
  assert.equal(new URL(siteConfig.url).protocol, "https:");
  assert.ok(existsSync(new URL(siteConfig.cvPath.slice(1), publicRoot)));
  for (const social of siteConfig.socials)
    assert.equal(new URL(social.url).protocol, "https:");
  assert.equal(
    new Set(siteConfig.navigation.map((item) => item.id)).size,
    siteConfig.navigation.length,
  );
  assert.ok(
    existsSync(
      fileURLToPath(
        new URL("../public/images/profile/profile.jpg", import.meta.url),
      ),
    ),
  );
});
