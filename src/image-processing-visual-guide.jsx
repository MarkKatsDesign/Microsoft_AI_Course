import React, { useState, useEffect } from "react";

const Section = ({ title, children, color = "#6366f1" }) => (
  <div className="mb-8 bg-white rounded-2xl shadow-lg overflow-hidden">
    <div className="px-6 py-4" style={{ backgroundColor: color }}>
      <h2 className="text-xl font-bold text-white">{title}</h2>
    </div>
    <div className="p-6">{children}</div>
  </div>
);

const PixelGrid = ({
  pixels,
  cellSize = 40,
  showValues = true,
  label = "",
}) => {
  const rows = pixels.length;
  const cols = pixels[0].length;

  return (
    <div className="inline-block">
      {label && (
        <div className="text-sm text-gray-600 mb-1 text-center">{label}</div>
      )}
      <div
        className="grid border border-gray-300"
        style={{
          gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
          gridTemplateRows: `repeat(${rows}, ${cellSize}px)`,
        }}
      >
        {pixels.flat().map((val, i) => {
          const isRGB = typeof val === "object";
          const bgColor = isRGB
            ? `rgb(${val.r}, ${val.g}, ${val.b})`
            : `rgb(${val}, ${val}, ${val})`;
          const textColor = isRGB
            ? (val.r + val.g + val.b) / 3 > 128
              ? "#000"
              : "#fff"
            : val > 128
            ? "#000"
            : "#fff";

          return (
            <div
              key={i}
              className="border border-gray-200 flex items-center justify-center text-xs font-mono"
              style={{
                backgroundColor: bgColor,
                color: textColor,
                width: cellSize,
                height: cellSize,
              }}
            >
              {showValues && (isRGB ? "" : val)}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const GrayscaleSection = () => {
  const [hoveredCell, setHoveredCell] = useState(null);

  const grayscalePixels = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 255, 255, 255, 0, 0],
    [0, 0, 255, 255, 255, 0, 0],
    [0, 0, 255, 255, 255, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
  ];

  return (
    <Section title="🖼️ How Computers See Images" color="#3b82f6">
      <p className="text-gray-700 mb-4">
        To a computer, an image is just an <strong>array of numbers</strong>.
        Each number represents the brightness of a pixel, from 0 (black) to 255
        (white).
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-semibold text-blue-800 mb-3">
            Pixel Values (7×7 array)
          </h3>
          <div className="bg-gray-50 rounded-lg p-4 font-mono text-xs overflow-x-auto">
            {grayscalePixels.map((row, i) => (
              <div key={i} className="flex gap-2">
                {row.map((val, j) => (
                  <span
                    key={j}
                    className={`w-8 text-center ${
                      val === 255 ? "text-blue-600 font-bold" : "text-gray-500"
                    }`}
                    onMouseEnter={() => setHoveredCell({ row: i, col: j, val })}
                    onMouseLeave={() => setHoveredCell(null)}
                  >
                    {val}
                  </span>
                ))}
              </div>
            ))}
          </div>

          {hoveredCell && (
            <div className="mt-2 text-sm text-blue-600">
              Position [{hoveredCell.row}, {hoveredCell.col}] ={" "}
              {hoveredCell.val}(
              {hoveredCell.val === 0
                ? "black"
                : hoveredCell.val === 255
                ? "white"
                : "gray"}
              )
            </div>
          )}
        </div>

        <div>
          <h3 className="font-semibold text-blue-800 mb-3">Rendered Image</h3>
          <div className="flex justify-center">
            <PixelGrid
              pixels={grayscalePixels}
              cellSize={45}
              showValues={false}
            />
          </div>
          <p className="text-sm text-gray-500 text-center mt-2">
            This is a 7×7 pixel image (49 pixels total)
          </p>
        </div>
      </div>

      <div className="mt-4 bg-blue-50 rounded-lg p-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-black rounded"></div>
            <span className="text-sm">0 = Black</span>
          </div>
          <div
            className="flex-1 h-8 rounded"
            style={{ background: "linear-gradient(to right, black, white)" }}
          ></div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white border rounded"></div>
            <span className="text-sm">255 = White</span>
          </div>
        </div>
      </div>
    </Section>
  );
};

const RGBSection = () => {
  const [activeChannel, setActiveChannel] = useState("all");

  const channels = {
    red: [
      [150, 150, 150, 150, 150, 150, 150],
      [150, 150, 150, 150, 150, 150, 150],
      [150, 150, 255, 255, 255, 150, 150],
      [150, 150, 255, 255, 255, 150, 150],
      [150, 150, 255, 255, 255, 150, 150],
      [150, 150, 150, 150, 150, 150, 150],
      [150, 150, 150, 150, 150, 150, 150],
    ],
    green: [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 255, 255, 255, 0, 0],
      [0, 0, 255, 255, 255, 0, 0],
      [0, 0, 255, 255, 255, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
    ],
    blue: [
      [255, 255, 255, 255, 255, 255, 255],
      [255, 255, 255, 255, 255, 255, 255],
      [255, 255, 0, 0, 0, 255, 255],
      [255, 255, 0, 0, 0, 255, 255],
      [255, 255, 0, 0, 0, 255, 255],
      [255, 255, 255, 255, 255, 255, 255],
      [255, 255, 255, 255, 255, 255, 255],
    ],
  };

  // Combine RGB channels
  const combinedPixels = channels.red.map((row, i) =>
    row.map((_, j) => ({
      r: channels.red[i][j],
      g: channels.green[i][j],
      b: channels.blue[i][j],
    }))
  );

  const getChannelPixels = (channel) => {
    return channels[channel].map((row) =>
      row.map((val) => {
        if (channel === "red") return { r: val, g: 0, b: 0 };
        if (channel === "green") return { r: 0, g: val, b: 0 };
        if (channel === "blue") return { r: 0, g: 0, b: val };
      })
    );
  };

  return (
    <Section title="🎨 Color Images: RGB Channels" color="#8b5cf6">
      <p className="text-gray-700 mb-4">
        Color images use <strong>three channels</strong>: Red, Green, and Blue.
        Each channel is a separate array of values that combine to create the
        final color.
      </p>

      <div className="flex flex-wrap gap-2 justify-center mb-6">
        {["all", "red", "green", "blue"].map((ch) => (
          <button
            key={ch}
            onClick={() => setActiveChannel(ch)}
            className={`px-4 py-2 rounded-lg font-medium capitalize transition-all ${
              activeChannel === ch
                ? ch === "all"
                  ? "bg-purple-600 text-white"
                  : ch === "red"
                  ? "bg-red-600 text-white"
                  : ch === "green"
                  ? "bg-green-600 text-white"
                  : "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {ch === "all" ? "🎨 Combined" : ch + " Channel"}
          </button>
        ))}
      </div>

      <div className="flex justify-center mb-4">
        {activeChannel === "all" ? (
          <PixelGrid pixels={combinedPixels} cellSize={45} showValues={false} />
        ) : (
          <PixelGrid
            pixels={getChannelPixels(activeChannel)}
            cellSize={45}
            showValues={false}
          />
        )}
      </div>

      {activeChannel !== "all" && (
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <h4 className="font-semibold mb-2 capitalize">
            {activeChannel} Channel Values:
          </h4>
          <div className="font-mono text-xs text-center">
            {channels[activeChannel].map((row, i) => (
              <div key={i}>{row.join("  ")}</div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="bg-purple-100 rounded-lg p-4 text-center">
          <div className="flex justify-center gap-2 mb-2">
            <span className="px-2 py-1 bg-red-500 text-white rounded text-sm">
              R: 150
            </span>
            <span className="px-2 py-1 bg-green-500 text-white rounded text-sm">
              G: 0
            </span>
            <span className="px-2 py-1 bg-blue-500 text-white rounded text-sm">
              B: 255
            </span>
          </div>
          <div
            className="w-12 h-12 mx-auto rounded"
            style={{ backgroundColor: "rgb(150, 0, 255)" }}
          ></div>
          <div className="text-sm text-purple-800 mt-1">= Purple</div>
        </div>
        <div className="bg-yellow-100 rounded-lg p-4 text-center">
          <div className="flex justify-center gap-2 mb-2">
            <span className="px-2 py-1 bg-red-500 text-white rounded text-sm">
              R: 255
            </span>
            <span className="px-2 py-1 bg-green-500 text-white rounded text-sm">
              G: 255
            </span>
            <span className="px-2 py-1 bg-blue-500 text-white rounded text-sm">
              B: 0
            </span>
          </div>
          <div
            className="w-12 h-12 mx-auto rounded"
            style={{ backgroundColor: "rgb(255, 255, 0)" }}
          ></div>
          <div className="text-sm text-yellow-800 mt-1">= Yellow</div>
        </div>
      </div>
    </Section>
  );
};

const ConvolutionSection = () => {
  const [step, setStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const inputPixels = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 255, 255, 255, 0, 0],
    [0, 0, 255, 255, 255, 0, 0],
    [0, 0, 255, 255, 255, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
  ];

  const kernel = [
    [-1, -1, -1],
    [-1, 8, -1],
    [-1, -1, -1],
  ];

  // Calculate output for each position
  const calculateOutput = (row, col) => {
    let sum = 0;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        sum += inputPixels[row + i][col + j] * kernel[i][j];
      }
    }
    return Math.max(0, Math.min(255, sum + 128)); // Normalize to 0-255
  };

  // Generate all positions
  const positions = [];
  for (let r = 0; r <= 4; r++) {
    for (let c = 0; c <= 4; c++) {
      positions.push({ row: r, col: c });
    }
  }

  const currentPos = positions[Math.min(step, positions.length - 1)];

  // Build output array up to current step
  const outputPixels = Array(5)
    .fill(null)
    .map(() => Array(5).fill(null));
  for (let i = 0; i <= step && i < positions.length; i++) {
    const pos = positions[i];
    outputPixels[pos.row][pos.col] = calculateOutput(pos.row, pos.col);
  }

  useEffect(() => {
    let interval;
    if (isRunning && step < positions.length - 1) {
      interval = setInterval(() => {
        setStep((s) => {
          const nextStep = s + 1;
          // Defer state update to avoid cascading renders
          if (nextStep >= positions.length - 1) {
            setTimeout(() => setIsRunning(false), 0);
          }
          return nextStep;
        });
      }, 300);
    }
    return () => clearInterval(interval);
  }, [isRunning, step, positions.length]);

  return (
    <Section title="🔲 Convolutional Filtering" color="#22c55e">
      <p className="text-gray-700 mb-4">
        <strong>Filters</strong> modify images by sliding a small matrix
        (kernel) across the image and calculating weighted sums. This is called{" "}
        <strong>convolution</strong>.
      </p>

      <div className="flex gap-2 mb-4">
        <button
          onClick={() => {
            setStep(0);
            setIsRunning(true);
          }}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          ▶️ Run Convolution
        </button>
        <button
          onClick={() => {
            setStep(0);
            setIsRunning(false);
          }}
          className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
        >
          Reset
        </button>
        <button
          onClick={() => setStep((s) => Math.min(s + 1, positions.length - 1))}
          className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
          disabled={step >= positions.length - 1}
        >
          Step →
        </button>
      </div>

      <div className="bg-green-50 rounded-xl p-4 mb-4">
        <div className="grid md:grid-cols-3 gap-4 items-start">
          {/* Input Image */}
          <div className="text-center">
            <h4 className="font-semibold text-green-800 mb-2">
              Input Image (7×7)
            </h4>
            <div className="inline-block relative">
              <div
                className="grid border-2 border-green-600"
                style={{
                  gridTemplateColumns: "repeat(7, 28px)",
                  gridTemplateRows: "repeat(7, 28px)",
                }}
              >
                {inputPixels.flat().map((val, i) => {
                  const row = Math.floor(i / 7);
                  const col = i % 7;
                  const isInKernel =
                    step < positions.length &&
                    row >= currentPos.row &&
                    row < currentPos.row + 3 &&
                    col >= currentPos.col &&
                    col < currentPos.col + 3;

                  return (
                    <div
                      key={i}
                      className={`flex items-center justify-center text-xs font-mono border ${
                        isInKernel
                          ? "border-red-500 border-2"
                          : "border-gray-200"
                      }`}
                      style={{
                        backgroundColor: `rgb(${val}, ${val}, ${val})`,
                        color: val > 128 ? "#000" : "#fff",
                      }}
                    >
                      {val > 0 ? val : ""}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Kernel */}
          <div className="text-center">
            <h4 className="font-semibold text-green-800 mb-2">
              Laplace Kernel (3×3)
            </h4>
            <div
              className="inline-grid border-2 border-red-500"
              style={{
                gridTemplateColumns: "repeat(3, 36px)",
                gridTemplateRows: "repeat(3, 36px)",
              }}
            >
              {kernel.flat().map((val, i) => (
                <div
                  key={i}
                  className={`flex items-center justify-center text-sm font-bold border border-red-200 ${
                    val === 8
                      ? "bg-red-500 text-white"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {val}
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-2">Edge detection filter</p>
          </div>

          {/* Output Image */}
          <div className="text-center">
            <h4 className="font-semibold text-green-800 mb-2">Output (5×5)</h4>
            <div
              className="inline-grid border-2 border-blue-500"
              style={{
                gridTemplateColumns: "repeat(5, 28px)",
                gridTemplateRows: "repeat(5, 28px)",
              }}
            >
              {outputPixels.flat().map((val, i) => (
                <div
                  key={i}
                  className="flex items-center justify-center text-xs border border-gray-200"
                  style={{
                    backgroundColor:
                      val !== null ? `rgb(${val}, ${val}, ${val})` : "#f3f4f6",
                    color: val !== null && val > 128 ? "#000" : "#fff",
                  }}
                >
                  {val !== null ? "" : "?"}
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Step {step + 1} of {positions.length}
            </p>
          </div>
        </div>
      </div>

      {step < positions.length && (
        <div className="bg-white rounded-lg p-4 border border-green-200 mb-4">
          <h4 className="font-semibold text-green-800 mb-2">
            Current Calculation:
          </h4>
          <div className="font-mono text-sm bg-gray-50 rounded p-3">
            {(() => {
              const parts = [];
              for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                  const pixelVal =
                    inputPixels[currentPos.row + i][currentPos.col + j];
                  const kernelVal = kernel[i][j];
                  parts.push(`(${pixelVal} × ${kernelVal})`);
                }
              }
              const result = calculateOutput(currentPos.row, currentPos.col);
              return (
                <>
                  <div className="text-xs text-gray-500 mb-1">
                    Position [{currentPos.row}, {currentPos.col}]:
                  </div>
                  <div className="break-all">{parts.join(" + ")}</div>
                  <div className="text-green-600 font-bold mt-1">
                    = {result} (normalized)
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}

      <div className="bg-yellow-50 rounded-lg p-3 border border-yellow-200">
        <p className="text-sm text-yellow-800">
          <strong>💡 Why 5×5 output?</strong> The kernel needs a 3×3 area to
          calculate each output pixel. Since we can't go beyond the edges, we
          lose 1 pixel on each side (7 - 2 = 5).
        </p>
      </div>
    </Section>
  );
};

const FilterEffectsSection = () => {
  const [selectedFilter, setSelectedFilter] = useState("edge");

  const filters = {
    edge: {
      name: "Edge Detection (Laplace)",
      kernel: [
        [-1, -1, -1],
        [-1, 8, -1],
        [-1, -1, -1],
      ],
      desc: "Highlights boundaries between regions",
      effect: "Edges appear bright, flat areas become dark",
    },
    blur: {
      name: "Box Blur",
      kernel: [
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1],
      ].map((row) => row.map((v) => v / 9)),
      desc: "Averages neighboring pixels",
      effect: "Image becomes softer/smoother",
    },
    sharpen: {
      name: "Sharpen",
      kernel: [
        [0, -1, 0],
        [-1, 5, -1],
        [0, -1, 0],
      ],
      desc: "Enhances differences between pixels",
      effect: "Details become more pronounced",
    },
    emboss: {
      name: "Emboss",
      kernel: [
        [-2, -1, 0],
        [-1, 1, 1],
        [0, 1, 2],
      ],
      desc: "Creates 3D lighting effect",
      effect: "Image appears raised/carved",
    },
  };

  const current = filters[selectedFilter];

  return (
    <Section title="✨ Common Filter Effects" color="#f59e0b">
      <p className="text-gray-700 mb-4">
        Different kernels produce different visual effects. Click to explore
        common filters:
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {Object.entries(filters).map(([key, filter]) => (
          <button
            key={key}
            onClick={() => setSelectedFilter(key)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              selectedFilter === key
                ? "bg-amber-500 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {filter.name.split(" ")[0]}
          </button>
        ))}
      </div>

      <div className="bg-amber-50 rounded-xl p-4">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-amber-800 mb-2">
              {current.name}
            </h4>
            <p className="text-sm text-amber-700 mb-4">{current.desc}</p>

            <div className="text-center">
              <div
                className="inline-grid border-2 border-amber-500 bg-white"
                style={{
                  gridTemplateColumns: "repeat(3, 50px)",
                  gridTemplateRows: "repeat(3, 50px)",
                }}
              >
                {current.kernel.flat().map((val, i) => {
                  const displayVal =
                    typeof val === "number"
                      ? Number.isInteger(val)
                        ? val
                        : val.toFixed(2)
                      : val;
                  const isCenter = i === 4;
                  const isPositive = val > 0;

                  return (
                    <div
                      key={i}
                      className={`flex items-center justify-center text-sm font-mono border border-amber-200 ${
                        isCenter
                          ? "bg-amber-500 text-white font-bold"
                          : isPositive
                          ? "bg-green-100 text-green-800"
                          : val < 0
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-50 text-gray-600"
                      }`}
                    >
                      {displayVal}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-amber-800 mb-2">
              Effect Preview
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-xs text-gray-500 mb-1">Original</div>
                <div className="w-full h-24 bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
                  <div className="w-12 h-12 bg-white rounded-full shadow-lg"></div>
                </div>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-500 mb-1">Filtered</div>
                <div
                  className={`w-full h-24 rounded-lg flex items-center justify-center ${
                    selectedFilter === "edge"
                      ? "bg-gray-800"
                      : selectedFilter === "blur"
                      ? "bg-gradient-to-br from-blue-300 via-purple-300 to-pink-300 blur-sm"
                      : selectedFilter === "sharpen"
                      ? "bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500"
                      : "bg-gradient-to-br from-gray-300 to-gray-500"
                  }`}
                >
                  {selectedFilter === "edge" && (
                    <div className="w-12 h-12 rounded-full border-2 border-white"></div>
                  )}
                  {selectedFilter === "blur" && (
                    <div className="w-14 h-14 bg-white/70 rounded-full"></div>
                  )}
                  {selectedFilter === "sharpen" && (
                    <div className="w-12 h-12 bg-white rounded-full shadow-xl"></div>
                  )}
                  {selectedFilter === "emboss" && (
                    <div className="w-12 h-12 bg-gray-200 rounded-full shadow-inner"></div>
                  )}
                </div>
              </div>
            </div>
            <p className="text-sm text-amber-700 mt-2 text-center">
              {current.effect}
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
};

const CNNConnectionSection = () => (
  <Section title="🧠 Connection to Deep Learning" color="#8b5cf6">
    <p className="text-gray-700 mb-4">
      The convolution operation you just learned is the{" "}
      <strong>foundation of Convolutional Neural Networks (CNNs)</strong> — the
      architecture that powers modern computer vision!
    </p>

    <div className="bg-purple-50 rounded-xl p-4 mb-4">
      <div className="flex items-center justify-center gap-4 flex-wrap">
        <div className="text-center">
          <div className="w-20 h-20 bg-blue-500 rounded-lg flex items-center justify-center text-white text-2xl">
            🖼️
          </div>
          <div className="text-sm mt-1">Input Image</div>
        </div>

        <svg
          width="40"
          height="24"
          viewBox="0 0 40 24"
          className="text-purple-400"
        >
          <path
            d="M 5,12 L 30,12 M 26,8 L 30,12 L 26,16"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
        </svg>

        <div className="text-center">
          <div className="w-20 h-20 bg-purple-500 rounded-lg flex items-center justify-center text-white text-2xl">
            🔲
          </div>
          <div className="text-sm mt-1">Conv Layers</div>
          <div className="text-xs text-gray-500">Learned filters</div>
        </div>

        <svg
          width="40"
          height="24"
          viewBox="0 0 40 24"
          className="text-purple-400"
        >
          <path
            d="M 5,12 L 30,12 M 26,8 L 30,12 L 26,16"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
        </svg>

        <div className="text-center">
          <div className="w-20 h-20 bg-green-500 rounded-lg flex items-center justify-center text-white text-2xl">
            🏷️
          </div>
          <div className="text-sm mt-1">Classification</div>
          <div className="text-xs text-gray-500">Dog, Cat, etc.</div>
        </div>
      </div>
    </div>

    <div className="grid md:grid-cols-2 gap-4">
      <div className="bg-white rounded-lg p-4 border">
        <h4 className="font-semibold text-purple-800 mb-2">
          🔲 Traditional Filters
        </h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>
            • Kernels are <strong>hand-designed</strong>
          </li>
          <li>• Fixed effects (blur, edge detect)</li>
          <li>• Same filter for all images</li>
        </ul>
      </div>
      <div className="bg-white rounded-lg p-4 border">
        <h4 className="font-semibold text-purple-800 mb-2">🧠 CNN Filters</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>
            • Kernels are <strong>learned</strong> from data
          </li>
          <li>• Discover useful features automatically</li>
          <li>• Adapt to the specific task</li>
        </ul>
      </div>
    </div>

    <div className="mt-4 bg-yellow-50 rounded-lg p-3 border border-yellow-200">
      <p className="text-sm text-yellow-800">
        <strong>💡 Key Insight:</strong> In CNNs, the kernel values aren't
        chosen by humans — they're learned through training! The network
        discovers which filters best detect cats, dogs, faces, or whatever
        you're trying to classify.
      </p>
    </div>
  </Section>
);

const SummarySection = () => (
  <Section title="🎓 Key Takeaways" color="#1e293b">
    <div className="grid md:grid-cols-2 gap-4 mb-4">
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
        <h3 className="font-bold text-blue-800 mb-2">🖼️ Images = Arrays</h3>
        <p className="text-sm text-blue-700">
          Images are 2D (or 3D for color) arrays of pixel values ranging from
          0-255.
        </p>
      </div>
      <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200">
        <h3 className="font-bold text-purple-800 mb-2">🎨 RGB Channels</h3>
        <p className="text-sm text-purple-700">
          Color images have 3 channels (Red, Green, Blue) that combine to create
          any color.
        </p>
      </div>
      <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
        <h3 className="font-bold text-green-800 mb-2">🔲 Convolution</h3>
        <p className="text-sm text-green-700">
          Slide a kernel across the image, compute weighted sums to create
          filtered output.
        </p>
      </div>
      <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-4 border border-amber-200">
        <h3 className="font-bold text-amber-800 mb-2">✨ Filter Effects</h3>
        <p className="text-sm text-amber-700">
          Different kernels create different effects: blur, sharpen, edge
          detection, emboss.
        </p>
      </div>
    </div>

    <div className="bg-gray-100 rounded-xl p-4">
      <h3 className="font-bold text-gray-800 mb-2">💡 The Big Picture</h3>
      <p className="text-gray-700">
        Understanding images as arrays and convolution as an operation is
        fundamental to computer vision. The same convolution operation used in
        traditional image filters is the core building block of Convolutional
        Neural Networks (CNNs), which power image classification, object
        detection, facial recognition, and countless other AI applications!
      </p>
    </div>
  </Section>
);

export default function ImageProcessingGuide() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 p-6">
      <div className="max-w-[1536px] mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            🖼️ Images & Image Processing
          </h1>
          <p className="text-gray-600">
            A Visual Guide to How Computers See and Transform Images
          </p>
        </div>

        <GrayscaleSection />
        <RGBSection />
        <ConvolutionSection />
        <FilterEffectsSection />
        <CNNConnectionSection />
        <SummarySection />
      </div>
    </div>
  );
}
