import { Viewer } from "cesium";
import type { NextPage } from "next";
import { useCallback, useEffect, useState } from "react";
import * as Cesium from "cesium";

const Home: NextPage = () => {
  const [map, setMap] = useState<any>(null);
  const [data, setData] = useState<{
    model: any;
    position: any;
    hpRoll: any;
    hpRange: any;
    fixedFrameTransform: any;
    activeAnimations: any;
    entity: any;
  }>({
    model: null,
    position: null,
    hpRange: null,
    hpRoll: null,
    fixedFrameTransform: null,
    activeAnimations: null,
    entity: null,
  });

  useEffect(() => {
    const viewer = new Viewer("map");

    const scene = viewer.scene;
    const camera = viewer.camera;

    scene.light.intensity = 10.0;

    const controller = scene.screenSpaceCameraController;

    setMap(viewer);

    const url = "/models/model.glb";

    let position: any = Cesium.Cartesian3.fromDegrees(
      102.81974195656005,
      16.455833575958096
    );

    let hpRoll = new Cesium.HeadingPitchRoll();
    let hpRange = new Cesium.HeadingPitchRange();

    const fixedFrameTransform =
      Cesium.Transforms.localFrameToFixedFrameGenerator("north", "west");

    const userModel = scene.primitives.add(
      Cesium.Model.fromGltf({
        url: url,
        modelMatrix: Cesium.Transforms.headingPitchRollToFixedFrame(
          position,
          hpRoll,
          Cesium.Ellipsoid.WGS84,
          fixedFrameTransform
        ),
      })
    );

    let r: any = 0;
    userModel.readyPromise.then(function (model) {
      model.activeAnimations.add({
        name: "IDLE",
        loop: Cesium.ModelAnimationLoop.REPEAT, // Loop the animations
        delay: 0.2,
        multiplier: 0.7,
      });

      // var animations = model.activeAnimations;
      // var length = animations.length;
      // for (var i = 0; i < length; ++i) {
      //   console.log(animations.get(i).name);
      // }

      r = 2.0 * Math.max(model.boundingSphere.radius, camera.frustum.near);
      controller.minimumZoomDistance = r * 0.5;
      // controller.maximumZoomDistance = r * 2.8;
      const center = model.boundingSphere.center;
      const heading = Cesium.Math.toRadians(0.0);
      const pitch = Cesium.Math.toRadians(-10.0);
      hpRange.heading = heading;
      hpRange.pitch = pitch;
      hpRange.range = r * 2.8;
      camera.lookAt(center, hpRange);
    });

    const updateSpeedLabel = (time, result) => {
      return `Siriwat`;
    };

    const modelLabel = viewer.entities.add({
      position: position,
      label: {
        text: new Cesium.CallbackProperty(updateSpeedLabel, false),
        font: "20px sans-serif",
        showBackground: true,
        distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
          0.0,
          100.0
        ),
        eyeOffset: new Cesium.Cartesian3(0, 2, 0),
      },
    });

    viewer.trackedEntity = modelLabel;
    modelLabel.viewFrom = new Cesium.Cartesian3(-30.0, -10.0, 10.0) as any;

    setData({
      ...data,
      model: userModel,
      hpRange: hpRange,
      hpRoll: hpRoll,
      fixedFrameTransform: fixedFrameTransform,
      position: position,
      activeAnimations: "IDLE",
      entity: modelLabel,
    });

    return () => {
      viewer?.destroy();
    };
  }, []);

  const directionModel = (radius: number, name: string, keyUp?: boolean) => {
    if (keyUp) {
    } else {
      let speedVector = new Cesium.Cartesian3();
      let speed = name === "RUN" ? 3 : 1;

      const camera = map.camera;
      data.hpRoll.heading = camera.heading - radius;

      speedVector = Cesium.Cartesian3.multiplyByScalar(
        Cesium.Cartesian3.UNIT_X,
        speed / 10,
        speedVector
      );

      data.position = Cesium.Matrix4.multiplyByPoint(
        data.model.modelMatrix,
        speedVector,
        data.position
      );

      Cesium.Transforms.headingPitchRollToFixedFrame(
        data.position,
        data.hpRoll,
        Cesium.Ellipsoid.WGS84,
        data.fixedFrameTransform,
        data.model.modelMatrix
      );

      data.entity.position = data.position;

      map.trackedEntity = data.entity;

      if (data.activeAnimations === name) {
      } else {
        const a = data.model.activeAnimations.add({
          name: data.activeAnimations,
        });
        data.model.activeAnimations.remove(a);

        data.model.activeAnimations.add({
          name: name,
          loop: Cesium.ModelAnimationLoop.REPEAT,
          delay: 1,
          multiplier: 0.7,
        });

        data.activeAnimations = name;
      }
    }
  };

  const controlModel = useCallback(() => {
    if (data.model && map) {
      let keys = {
        a: false,
        s: false,
        d: false,
        w: false,
        shiftleft: false,
        arrowleft: false,
        arrowright: false,
        arrowup: false,
        arrowdown: false,
        space: false,
      };
      document.addEventListener("keydown", function (e) {
        const key = e.code.replace("Key", "").toLowerCase();
        if (keys[key] !== undefined) keys[key] = true;
      });
      document.addEventListener("keyup", function (e) {
        directionModel(-data.hpRoll.heading, "IDLE");
        const key = e.code.replace("Key", "").toLowerCase();
        if (keys[key] !== undefined) keys[key] = false;
      });

      let deltaRadians = Cesium.Math.toRadians(3.0);

      map.clock.onTick.addEventListener(function (clock) {
        clock.shouldAnimate = true;
        if (keys.w) {
          console.log("object");
          if (keys.a) {
            directionModel(
              Number(Cesium.Math.PI / 4),
              keys.shiftleft ? "RUN" : "WALK"
            );
          } else if (keys.d) {
            directionModel(
              Number((7 * Cesium.Math.PI) / 4),
              keys.shiftleft ? "RUN" : "WALK"
            );
          } else {
            directionModel(Number(0), keys.shiftleft ? "RUN" : "WALK");
          }
        } else if (keys.s) {
          if (keys.a) {
            directionModel(
              Number((3 * Cesium.Math.PI) / 4),
              keys.shiftleft ? "RUN" : "WALK"
            );
          } else if (keys.d) {
            directionModel(
              Number((5 * Cesium.Math.PI) / 4),
              keys.shiftleft ? "RUN" : "WALK"
            );
          } else {
            directionModel(
              Number(Cesium.Math.PI),
              keys.shiftleft ? "RUN" : "WALK"
            );
          }
        } else if (keys.a) {
          directionModel(
            Number(Cesium.Math.PI / 2),
            keys.shiftleft ? "RUN" : "WALK"
          );
        } else if (keys.d) {
          directionModel(
            Number((3 * Cesium.Math.PI) / 2),
            keys.shiftleft ? "RUN" : "WALK"
          );
        } else if (keys.arrowleft) {
          // model.hpRoll.heading -= deltaRadians;
          // if (model.hpRoll.heading < 0.0) {
          //   model.hpRoll.heading += Cesium.Math.TWO_PI;
          // }
          // rotateModel();
        } else if (keys.arrowright) {
          // model.hpRoll.heading += deltaRadians;
          // if (model.hpRoll.heading > Cesium.Math.TWO_PI) {
          //   model.hpRoll.heading -= Cesium.Math.TWO_PI;
          // }
          // rotateModel();
        } else {
        }
      });
    }
    return () => {
      map && map.destroy();
    };
  }, [data, map]);

  useEffect(() => {
    controlModel();
    return () => {};
  }, [controlModel]);

  return (
    <div
      id="map"
      style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0 }}
    ></div>
  );
};

export default Home;
