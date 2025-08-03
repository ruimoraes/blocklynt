import React, { useEffect, useRef, forwardRef, useImperativeHandle, useState, useCallback, useMemo } from "react";
import * as Blockly from "blockly";
import Theme from '@blockly/theme-modern';
import { useEditor } from "../../../contexts/EditorContext";
import './custom_category';
import './BlocklyEditor.mobile.css';

const BlocklyEditor = forwardRef(function BlocklyEditor({
  toolboxJson, 
  onWorkspaceChange 
}, ref) {  
  const { gameNameKey } = useEditor();
  const blocklyDiv = useRef(null);
  const workspaceRef = useRef(null);
  const [initialJson, setInitialJson] = useState(null);
  const isInitializedRef = useRef(false);

  const stableToolboxJson = useMemo(() => toolboxJson, [JSON.stringify(toolboxJson)]);
  const stableOnWorkspaceChange = useCallback(onWorkspaceChange || (() => {}), [onWorkspaceChange]);
  
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
    if (isInitializedRef.current) {
      return;
    }

    if (!blocklyDiv.current) {
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

    // Carregar blocos salvos se existirem
    if (initialJson) {
      try {
        Blockly.serialization.workspaces.load(initialJson, workspaceRef.current);
      } catch (error) {
        console.error("Erro ao carregar blocos:", error);
        workspaceRef.current.clear();
      }
    }

    // Configurar ref externa
    if (ref) {
      if (typeof ref === 'function') {
        ref(workspaceRef.current);
      } else {
        ref.current = workspaceRef.current;
      }
    }

    // Listener para salvar mudanças
    const listener = () => {
      if (!workspaceRef.current) return;
      
      const json = Blockly.serialization.workspaces.save(workspaceRef.current);
      localStorage.setItem(gameNameKey, JSON.stringify(json));
      stableOnWorkspaceChange(json);
    };

    workspaceRef.current.addChangeListener(listener);

    const observer = new ResizeObserver(() => {
      if (workspaceRef.current) {
        Blockly.svgResize(workspaceRef.current);
      }
    });
    observer.observe(blocklyDiv.current);

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
  }, [gameNameKey, stableToolboxJson, initialJson, stableOnWorkspaceChange, ref]);

  useEffect(() => {
    return () => {
      isInitializedRef.current = false;
    };
  }, [gameNameKey]);

  setTimeout(() => {
  const bg = document.querySelector('.blocklyToolboxBackground');
  if (bg) {
    bg.setAttribute('fill', 'none');
    bg.setAttribute('stroke', 'none');
  }
}, 0);

  return (    
    <div ref={blocklyDiv} className="w-full h-full" />
  );
});

export default BlocklyEditor;