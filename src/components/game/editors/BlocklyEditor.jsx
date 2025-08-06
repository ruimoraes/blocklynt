import React, { useEffect, useRef, forwardRef, useImperativeHandle, useState, useCallback, useMemo } from "react";
import * as Blockly from "blockly";
import Theme from '@blockly/theme-modern';
import { useEditor } from "../../../contexts/EditorContext";
import './custom_category';
import './BlocklyEditor.mobile.css';

const BlocklyEditor = forwardRef(function BlocklyEditor({
  toolboxJson,
  onWorkspaceChange,
  maxBlocks = Infinity
}, ref) {
  const { gameNameKey } = useEditor();
  const blocklyDiv = useRef(null);
  const workspaceRef = useRef(null);
  const [initialJson, setInitialJson] = useState(null);
  const isInitializedRef = useRef(false);
  const [currentBlockCount, setCurrentBlockCount] = useState(0);

  const stableToolboxJson = useMemo(() => toolboxJson, [JSON.stringify(toolboxJson)]);

  const isBlockLimitReached = useMemo(() => {
    if (maxBlocks === Infinity) return false;

    return maxBlocks <= currentBlockCount;
  }, [currentBlockCount, maxBlocks]);

  const workspaceChange = useCallback(() => {
    if (!workspaceRef.current) return;

    const allBlocks = workspaceRef.current.getAllBlocks();
    const blockCount = allBlocks.length;
    setCurrentBlockCount(blockCount);

    if (onWorkspaceChange) {
      onWorkspaceChange(blockCount);
    }
  }, [onWorkspaceChange]);

  const updateCategoriesState = useCallback(() => {
    if (!workspaceRef.current) return;

    const toolbox = workspaceRef.current.getToolbox();
    if (!toolbox) return;

    const categories = toolbox.getToolboxItems();

    categories.forEach(category => {
      if (isBlockLimitReached) {
        category.setDisabled(true);
      } else {
        category.setDisabled(false);
      }
    });
  }, [isBlockLimitReached]);

  useEffect(() => {
    updateCategoriesState();
  }, [updateCategoriesState]);

  useEffect(() => {
    const saved = localStorage.getItem(gameNameKey);
    if (saved) {
      try {
        const parsedJson = JSON.parse(saved);
        setInitialJson(parsedJson);
      } catch (error) {
        console.error("❌ Erro ao parsear localStorage:", error);
        setInitialJson(null);
      }
    } else {
      setInitialJson(null);
    }
  }, [gameNameKey]);

  useImperativeHandle(ref, () => workspaceRef.current, []);

  useEffect(() => {
    if (isInitializedRef.current || !blocklyDiv.current) {
      return;
    }

    isInitializedRef.current = true;

    const toolboxWithIcons = {
      ...stableToolboxJson,
      contents: stableToolboxJson.contents.map((cat) => {
        let icon = 'fa fa-cube';
        if (cat.name === 'Movimento') icon = 'fa fa-arrows-alt';
        if (cat.name === 'Repetição') icon = 'fa fa-refresh';
        if (cat.name === 'Lógica') icon = 'fa fa-code';
        if (cat.name === 'Sensores') icon = 'fa fa-eye';
        return { ...cat, 'css-icon': icon };
      }),
    };

    workspaceRef.current = Blockly.inject(blocklyDiv.current, {
      toolbox: toolboxWithIcons,
      trashcan: true,
      scrollbars: true,
      renderer: 'zelos',
      theme: Theme,
      grid: {
        spacing: 25,
        length: 3,
        colour: '#ccc',
        snap: true,
      },
      zoom: {
        controls: false,
        wheel: false,
        startScale: 0.7,
      },
    });

    if (initialJson) {
      try {
        Blockly.serialization.workspaces.load(initialJson, workspaceRef.current);
      } catch (error) {
        console.error("Erro ao carregar blocos:", error);
        workspaceRef.current.clear();
      }
    }

    const initialBlockCount = workspaceRef.current.getAllBlocks().length;
    setCurrentBlockCount(initialBlockCount);

    if (onWorkspaceChange) {
      onWorkspaceChange(initialBlockCount);
    }

    // Configurar ref externa
    if (ref) {
      if (typeof ref === 'function') {
        ref(workspaceRef.current);
      } else {
        ref.current = workspaceRef.current;
      }
    }

    const listener = (event) => {
      if (!workspaceRef.current) return;

      if (event.type === Blockly.Events.BLOCK_CREATE) {
        const currentCount = workspaceRef.current.getAllBlocks().length;

        // Se excedeu o limite, remover o bloco criado
        if (maxBlocks !== Infinity && currentCount > maxBlocks) {
          console.log('🚫 Limite de blocos excedido na duplicação, removendo bloco:', event.blockId);

          const blockToRemove = workspaceRef.current.getBlockById(event.blockId);
          if (blockToRemove) {
            Blockly.Events.disable();
            blockToRemove.dispose(false);
            Blockly.Events.enable();

            return;
          }
        }
      }


      const json = Blockly.serialization.workspaces.save(workspaceRef.current);
      localStorage.setItem(gameNameKey, JSON.stringify(json));

      workspaceChange();
    };

    workspaceRef.current.addChangeListener(listener);

    const observer = new ResizeObserver(() => {
      if (workspaceRef.current) {
        Blockly.svgResize(workspaceRef.current);
      }
    });
    observer.observe(blocklyDiv.current);

    // Configurar estado inicial das categorias e estilo
    setTimeout(() => {
      updateCategoriesState();

      // Remover background do toolbox
      const bg = document.querySelector('.blocklyToolboxBackground');
      if (bg) {
        bg.setAttribute('fill', 'none');
        bg.setAttribute('stroke', 'none');
      }
    }, 100);

    return () => {
      if (ref) {
        if (typeof ref === 'function') {
          ref(null);
        } else {
          ref.current = null;
        }
      }

      if (workspaceRef.current) {
        try {
          workspaceRef.current.dispose();
        } catch (error) {
          console.warn("Erro ao fazer dispose:", error);
        }
        workspaceRef.current = null;
      }

      observer.disconnect();
      isInitializedRef.current = false;
    };
  }, [gameNameKey, stableToolboxJson, initialJson]);

  return (
    <div ref={blocklyDiv} className="w-full h-full" />
  );
});

export default BlocklyEditor;