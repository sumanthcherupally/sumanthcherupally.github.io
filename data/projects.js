/*
  Projects grid on the home page. Each card shows `image` and reveals `title` + `tagline` on hover;
  clicking opens a panel with `summary`, `points`, `tags` and `links`.
  To use a real screenshot instead of the illustration, put it in images/projects/ and change `image`.
*/
window.PROJECTS = [
  {
    id: "transformer-lab",
    title: "Transformer architecture lab",
    tagline: "Comparing the building blocks of modern LLMs",
    where: "Personal project",
    image: "images/projects/transformer.svg",
    summary: "A PyTorch framework for comparing the transformer designs used in modern LLMs, side by side on the same data.",
    points: [
      "Implements multiple attention mechanisms and positional encodings as swappable, reusable components.",
      "Measures the performance trade-offs between architectures on the WikiText-2 dataset, with efficient data pipelines."
    ],
    tags: ["PyTorch", "Transformers", "LLMs", "Attention"],
    links: []
  },
  {
    id: "mcp-server",
    title: "MCP server for everyday tools",
    tagline: "Letting AI assistants handle email, calendar and maps",
    where: "Personal project",
    image: "images/projects/mcp.svg",
    summary: "A Python Model Context Protocol (MCP) server that lets AI assistants manage email, schedule events and look up places through plain-language requests.",
    points: [
      "Seven tools built on the Gmail, Google Calendar and Google Maps APIs.",
      "FastAPI service with OAuth 2.0 sign-in."
    ],
    tags: ["MCP", "Python", "FastAPI", "OAuth 2.0"],
    links: []
  },
  {
    id: "multi-robot-mapping",
    title: "Multi-robot 3D mapping",
    tagline: "Robots that build one shared map",
    where: "UC San Diego · Existential Robotics Lab · 2022–23",
    image: "images/projects/mapping.svg",
    summary: "Led a multi-agent SLAM project where several robots map the same space at once and merge what they see into one consistent 3D model.",
    points: [
      "Modeled surfaces with distributed sparse Gaussian processes that predict distance-to-surface (TSDF) values from dense point clouds.",
      "Organized the map in an octree so it scales to large spaces and stays fast to query."
    ],
    tags: ["SLAM", "Gaussian processes", "Point clouds", "Python"],
    links: []
  },
  {
    id: "rl-driving",
    title: "Self-driving from pixels",
    tagline: "Deep RL that steers from camera images",
    where: "UC San Diego · Existential Robotics Lab · 2022",
    image: "images/projects/rl-driving.svg",
    summary: "Trained deep reinforcement learning agents to drive a car end to end, from raw camera frames straight to steering and throttle.",
    points: [
      "Used policy-gradient methods to learn control directly from vision in a simulated driving environment."
    ],
    tags: ["Reinforcement learning", "Computer vision", "PyTorch"],
    links: []
  },
  {
    id: "matmul",
    title: "1,100× faster matrix multiply",
    tagline: "Squeezing every cycle out of GPUs and CPUs",
    where: "UC San Diego · Graduate project",
    image: "images/projects/matmul.svg",
    summary: "Optimized matrix multiplication, the core operation behind neural networks, on both GPU and CPU.",
    points: [
      "1,100× speedup on NVIDIA GPUs by tuning occupancy with blocking and tiling in CUDA.",
      "7× on CPU with cache blocking, packing and SIMD intrinsics."
    ],
    tags: ["CUDA", "C++", "OpenMP", "MPI"],
    links: []
  },
  {
    id: "nerf",
    title: "Neural Radiance Fields",
    tagline: "3D scenes from a handful of photos",
    where: "UC San Diego · Graduate project",
    image: "images/projects/nerf.svg",
    summary: "Implemented and compared NeRF and its variants for novel view synthesis: rendering new camera angles of a scene that was never photographed from there.",
    points: [
      "Built the original NeRF, plus Mip-NeRF (anti-aliased) and PixelNeRF (works from few images).",
      "Rendered and evaluated synthetic 3D views across the variants."
    ],
    tags: ["PyTorch", "3D vision", "Neural rendering"],
    links: []
  },
  {
    id: "segmentation",
    title: "Segmentation & captioning",
    tagline: "Teaching networks to outline and describe images",
    where: "Deep learning project",
    image: "images/projects/segmentation.svg",
    summary: "Implemented deep CNN and LSTM models that label every pixel of an image and write a sentence describing it.",
    points: [
      "Segmentation with ResNet, U-Net and PSPNet architectures.",
      "Image captioning by pairing a CNN image encoder with an LSTM language model."
    ],
    tags: ["PyTorch", "CNNs", "LSTMs", "Computer vision"],
    links: []
  },
  {
    id: "occlusion",
    title: "Seeing what's hidden",
    tagline: "Depth-aware occlusion detection",
    where: "IIT Hyderabad · Lab for Video and Image Analysis · 2020–21",
    image: "images/projects/depth.svg",
    summary: "Proposed a new depth-based method to tell whether objects in an image are partly blocked, using monocular depth estimation.",
    points: [
      "Raised recall from 76% to over 95% at the same precision.",
      "Designed ResNet-based networks for object recognition and depth estimation on 3D datasets.",
      "Prepared the pipeline for real-world use, with a way for people to step in and tune the model's settings."
    ],
    tags: ["Deep learning", "Depth estimation", "ResNet"],
    links: []
  },
  {
    id: "dag-ledger",
    title: "DAG ledger for IoT",
    tagline: "A blockchain light enough for sensors",
    where: "IIT Hyderabad · Networking and Blockchain Lab · 2019–21",
    image: "images/projects/dag-ledger.svg",
    summary: "Designed a lightweight, scalable distributed ledger built on a DAG instead of a chain, so low-power IoT devices can prove their data hasn't been tampered with.",
    points: [
      "Concurrent networking in Go with goroutines and channels.",
      "Tested on a 200-node peer-to-peer network running across servers in Docker containers.",
      "Demoed live on Raspberry Pis at CEATEC 2019 in Japan, representing IIT Hyderabad.",
      "Published at ICOIN 2021. A follow-up journal paper applied it to securing internet (BGP) routing."
    ],
    tags: ["Go", "Distributed systems", "Blockchain", "IoT"],
    links: [
      { label: "Gateway code", href: "https://github.com/sumanthcherupally/LSDI_GW" },
      { label: "Node code", href: "https://github.com/sumanthcherupally/LSDI_SN" }
    ]
  }
];
