const ROOM_TARGETS = {
  home: { position: "0 0 2.8", rotation: "0 0 0", label: "Homeroom" },
  artifacts: { position: "0 0 -10", rotation: "0 0 0", label: "Artifacts" },
  projects: { position: "10 0 0", rotation: "0 -90 0", label: "Projects" },
  notes: { position: "0 0 10", rotation: "0 180 0", label: "Notes" },
  reflections: { position: "-10 0 0", rotation: "0 90 0", label: "Reflections" },
};

function createBox(parent, attrs) {
  const box = document.createElement("a-box");
  Object.entries(attrs).forEach(([key, value]) => box.setAttribute(key, value));
  parent.appendChild(box);
  return box;
}

function createText(parent, attrs) {
  const text = document.createElement("a-entity");
  Object.entries(attrs).forEach(([key, value]) => text.setAttribute(key, value));
  parent.appendChild(text);
  return text;
}

AFRAME.registerComponent("workshop-room", {
  schema: {
    name: { default: "Room" },
    width: { default: 8 },
    depth: { default: 8 },
    height: { default: 3.2 },
    color: { default: "#18223d" },
    x: { default: 0 },
    z: { default: 0 },
    doors: { default: "" },
  },

  init() {
    const d = this.data;
    const doors = new Set(d.doors.split(",").map((door) => door.trim()).filter(Boolean));
    const wallThickness = 0.16;
    const doorWidth = 2.1;
    const doorHeight = 2.45;
    const sideWidth = (d.width - doorWidth) / 2;
    const sideDepth = (d.depth - doorWidth) / 2;
    const wallY = d.height / 2;
    const topHeight = Math.max(0.2, d.height - doorHeight);

    this.el.setAttribute("position", d.x + " 0 " + d.z);
    createBox(this.el, { width: d.width, height: 0.08, depth: d.depth, position: "0 -0.04 0", material: "color: " + d.color + "; roughness: 0.95; metalness: 0" });
    createBox(this.el, { width: d.width, height: 0.08, depth: d.depth, position: "0 " + d.height + " 0", material: "color: #0f172c; roughness: 1" });
    this.makeWall("north", doors.has("north"), sideWidth, wallThickness, d.depth / -2, wallY, topHeight, d);
    this.makeWall("south", doors.has("south"), sideWidth, wallThickness, d.depth / 2, wallY, topHeight, d);
    this.makeSideWall("east", doors.has("east"), sideDepth, wallThickness, d.width / 2, wallY, topHeight, d);
    this.makeSideWall("west", doors.has("west"), sideDepth, wallThickness, d.width / -2, wallY, topHeight, d);
    createText(this.el, { position: "0 3.05 0", rotation: "-90 0 0", text: "value: " + d.name + "; align: center; color: #fff6e5; width: 5; wrapCount: 24" });
  },

  makeWall(side, hasDoor, segmentWidth, thickness, z, wallY, topHeight, d) {
    const color = side === "north" ? "#111a31" : "#151f38";
    if (!hasDoor) {
      createBox(this.el, { width: d.width, height: d.height, depth: thickness, position: "0 " + wallY + " " + z, material: "color: " + color + "; roughness: 1" });
      return;
    }
    createBox(this.el, { width: segmentWidth, height: d.height, depth: thickness, position: -(d.width / 2 - segmentWidth / 2) + " " + wallY + " " + z, material: "color: " + color + "; roughness: 1" });
    createBox(this.el, { width: segmentWidth, height: d.height, depth: thickness, position: d.width / 2 - segmentWidth / 2 + " " + wallY + " " + z, material: "color: " + color + "; roughness: 1" });
    createBox(this.el, { width: d.width - segmentWidth * 2, height: topHeight, depth: thickness, position: "0 " + (2.45 + topHeight / 2) + " " + z, material: "color: " + color + "; roughness: 1" });
  },

  makeSideWall(side, hasDoor, segmentDepth, thickness, x, wallY, topHeight, d) {
    const color = side === "east" ? "#111a31" : "#151f38";
    if (!hasDoor) {
      createBox(this.el, { width: thickness, height: d.height, depth: d.depth, position: x + " " + wallY + " 0", material: "color: " + color + "; roughness: 1" });
      return;
    }
    createBox(this.el, { width: thickness, height: d.height, depth: segmentDepth, position: x + " " + wallY + " " + -(d.depth / 2 - segmentDepth / 2), material: "color: " + color + "; roughness: 1" });
    createBox(this.el, { width: thickness, height: d.height, depth: segmentDepth, position: x + " " + wallY + " " + (d.depth / 2 - segmentDepth / 2), material: "color: " + color + "; roughness: 1" });
    createBox(this.el, { width: thickness, height: topHeight, depth: d.depth - segmentDepth * 2, position: x + " " + (2.45 + topHeight / 2) + " 0", material: "color: " + color + "; roughness: 1" });
  },
});

AFRAME.registerComponent("workshop-corridor", {
  schema: { direction: { default: "north" } },
  init() {
    const dir = this.data.direction;
    const isZ = dir === "north" || dir === "south";
    const sign = dir === "north" || dir === "west" ? -1 : 1;
    const length = 2.25;
    const width = 2.1;
    const center = 4 + length / 2;
    const pos = isZ ? "0 0 " + sign * center : sign * center + " 0 0";
    const floorSize = isZ ? { width, depth: length } : { width: length, depth: width };
    const wallA = isZ ? { width: 0.12, height: 2.6, depth: length, position: width / 2 + " 1.3 " + sign * center } : { width: length, height: 2.6, depth: 0.12, position: sign * center + " 1.3 " + width / 2 };
    const wallB = isZ ? { width: 0.12, height: 2.6, depth: length, position: -width / 2 + " 1.3 " + sign * center } : { width: length, height: 2.6, depth: 0.12, position: sign * center + " 1.3 " + -width / 2 };
    createBox(this.el, { width: floorSize.width, height: 0.08, depth: floorSize.depth, position: pos, material: "color: #202a43; roughness: 0.95" });
    createBox(this.el, { ...wallA, material: "color: #0f172c; roughness: 1" });
    createBox(this.el, { ...wallB, material: "color: #0f172c; roughness: 1" });
  },
});

AFRAME.registerComponent("workshop-room-marker", {
  schema: { room: { default: "home" }, label: { default: "Room" }, x: { default: 0 }, z: { default: 0 } },
  init() {
    const d = this.data;
    this.el.setAttribute("position", d.x + " 0 " + d.z);
    createBox(this.el, { class: "interactable", width: 1.5, height: 0.12, depth: 1.5, position: "0 0.06 0", material: "color: #ffb86b; emissive: #ff9d4b; emissiveIntensity: 0.25", "workshop-jump": "target: " + d.room });
    createText(this.el, { position: "0 1.25 -2.35", text: "value: " + d.label + "; align: center; color: #fff6e5; width: 4.6; wrapCount: 22" });
  },
});

AFRAME.registerComponent("workshop-jump", {
  schema: { target: { default: "home" } },
  init() {
    this.el.addEventListener("click", () => jumpToRoom(this.data.target));
  },
});

AFRAME.registerComponent("workshop-orb", {
  tick(time) {
    const pulse = 1 + Math.sin(time / 450) * 0.055;
    this.el.setAttribute("scale", pulse + " " + pulse + " " + pulse);
    this.el.object3D.rotation.y += 0.006;
  },
});

AFRAME.registerComponent("workshop-room-tracker", {
  tick() {
    const rig = document.getElementById("cameraRig");
    if (!rig) return;
    const p = rig.object3D.position;
    let current = "Homeroom";
    if (p.z < -6.2) current = "Artifacts";
    else if (p.x > 6.2) current = "Projects";
    else if (p.z > 6.2) current = "Notes";
    else if (p.x < -6.2) current = "Reflections";
    const status = document.getElementById("roomStatus");
    if (status && status.dataset.current !== current) {
      status.dataset.current = current;
      status.textContent = "Current room: " + current;
    }
  },
});

function jumpToRoom(target) {
  const rig = document.getElementById("cameraRig");
  const camera = document.getElementById("playerCamera");
  const next = ROOM_TARGETS[target] || ROOM_TARGETS.home;
  if (!rig) return;
  rig.setAttribute("position", next.position);
  if (camera) camera.setAttribute("rotation", next.rotation);
  const status = document.getElementById("roomStatus");
  if (status) {
    status.dataset.current = next.label;
    status.textContent = "Current room: " + next.label;
  }
}

window.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-jump]").forEach((button) => {
    button.addEventListener("click", () => jumpToRoom(button.dataset.jump));
  });
  const panel = document.getElementById("desktopPanel");
  const restore = document.getElementById("restorePanel");
  const collapse = document.getElementById("collapsePanel");
  if (restore) restore.classList.add("is-hidden");
  if (collapse) collapse.addEventListener("click", () => {
    if (panel) panel.classList.add("is-hidden");
    if (restore) restore.classList.remove("is-hidden");
  });
  if (restore) restore.addEventListener("click", () => {
    if (panel) panel.classList.remove("is-hidden");
    restore.classList.add("is-hidden");
  });
});
