/**
 * Adiciona um listener para resize em qualquer cena Phaser.
 * @param {Phaser.Scene} scene - A cena atual
 * @param {(gameSize: Phaser.Structs.Size, baseSize: Phaser.Structs.Size, displaySize: Phaser.Structs.Size, resolution: number) => void} callback
 */
export function usePhaserResize(scene, callback) {
  scene.scale.on("resize", callback);

  // Garante que já chamamos no estado inicial
  callback(scene.scale.gameSize, scene.scale.baseSize, scene.scale.displaySize, scene.scale.resolution);

  // Remove o listener ao destruir a cena
  scene.events.once("shutdown", () => {
    scene.scale.off("resize", callback);
  });
}
