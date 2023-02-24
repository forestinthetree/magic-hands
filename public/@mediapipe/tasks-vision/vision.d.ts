/**
 * Copyright 2022 The MediaPipe Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/** Options to configure MediaPipe model loading and processing. */
declare interface BaseOptions_2 {
    /**
     * The model path to the model asset file. Only one of `modelAssetPath` or
     * `modelAssetBuffer` can be set.
     */
    modelAssetPath?: string | undefined;
    /**
     * A buffer containing the model aaset. Only one of `modelAssetPath` or
     * `modelAssetBuffer` can be set.
     */
    modelAssetBuffer?: Uint8Array | undefined;
    /** Overrides the default backend to use for the provided model. */
    delegate?: "CPU" | "GPU" | undefined;
}

/** An integer bounding box, axis aligned. */
export declare interface BoundingBox {
    /** The X coordinate of the top-left corner, in pixels. */
    originX: number;
    /** The Y coordinate of the top-left corner, in pixels. */
    originY: number;
    /** The width of the bounding box, in pixels. */
    width: number;
    /** The height of the bounding box, in pixels. */
    height: number;
}

/**
 * Copyright 2022 The MediaPipe Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/** A classification category. */
export declare interface Category {
    /** The probability score of this label category. */
    score: number;
    /** The index of the category in the corresponding label file. */
    index: number;
    /**
     * The label of this category object. Defaults to an empty string if there is
     * no category.
     */
    categoryName: string;
    /**
     * The display name of the label, which may be translated for different
     * locales. For example, a label, "apple", may be translated into Spanish for
     * display purpose, so that the `display_name` is "manzana". Defaults to an
     * empty string if there is no display name.
     */
    displayName: string;
}

/** Classification results for a given classifier head. */
export declare interface Classifications {
    /**
     * The array of predicted categories, usually sorted by descending scores,
     * e.g., from high to low probability.
     */
    categories: Category[];
    /**
     * The index of the classifier head these categories refer to. This is
     * useful for multi-head models.
     */
    headIndex: number;
    /**
     * The name of the classifier head, which is the corresponding tensor
     * metadata name. Defaults to an empty string if there is no such metadata.
     */
    headName: string;
}

/**
 * Copyright 2022 The MediaPipe Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/** Options to configure a MediaPipe Classifier Task. */
declare interface ClassifierOptions {
    /**
     * The locale to use for display names specified through the TFLite Model
     * Metadata, if any. Defaults to English.
     */
    displayNamesLocale?: string | undefined;
    /** The maximum number of top-scored detection results to return. */
    maxResults?: number | undefined;
    /**
     * Overrides the value provided in the model metadata. Results below this
     * value are rejected.
     */
    scoreThreshold?: number | undefined;
    /**
     * Allowlist of category names. If non-empty, detection results whose category
     * name is not in this set will be filtered out. Duplicate or unknown category
     * names are ignored. Mutually exclusive with `categoryDenylist`.
     */
    categoryAllowlist?: string[] | undefined;
    /**
     * Denylist of category names. If non-empty, detection results whose category
     * name is in this set will be filtered out. Duplicate or unknown category
     * names are ignored. Mutually exclusive with `categoryAllowlist`.
     */
    categoryDenylist?: string[] | undefined;
}

/** Represents one object detected by the `ObjectDetector`. */
export declare interface Detection {
    /** A list of `Category` objects. */
    categories: Category[];
    /** The bounding box of the detected objects. */
    boundingBox?: BoundingBox;
}

/**
 * Copyright 2022 The MediaPipe Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/** Options to configure a MediaPipe Embedder Task */
declare interface EmbedderOptions {
    /**
     * Whether to normalize the returned feature vector with L2 norm. Use this
     * option only if the model does not already contain a native L2_NORMALIZATION
     * TF Lite Op. In most cases, this is already the case and L2 norm is thus
     * achieved through TF Lite inference.
     */
    l2Normalize?: boolean | undefined;
    /**
     * Whether the returned embedding should be quantized to bytes via scalar
     * quantization. Embeddings are implicitly assumed to be unit-norm and
     * therefore any dimension is guaranteed to have a value in [-1.0, 1.0]. Use
     * the l2_normalize option if this is not the case.
     */
    quantize?: boolean | undefined;
}

/**
 * Copyright 2022 The MediaPipe Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * List of embeddings with an optional timestamp.
 *
 * One and only one of the two 'floatEmbedding' and 'quantizedEmbedding' will
 * contain data, based on whether or not the embedder was configured to perform
 * scalar quantization.
 */
export declare interface Embedding {
    /**
     *  Floating-point embedding. Empty if the embedder was configured to perform
     * scalar-quantization.
     */
    floatEmbedding?: number[];
    /**
     * Scalar-quantized embedding. Empty if the embedder was not configured to
     * perform scalar quantization.
     */
    quantizedEmbedding?: Uint8Array;
    /**
     * The index of the classifier head these categories refer to. This is
     * useful for multi-head models.
     */
    headIndex: number;
    /**
     * The name of the classifier head, which is the corresponding tensor
     * metadata name.
     */
    headName: string;
}

/**
 * Resolves the files required for the MediaPipe Task APIs.
 *
 * This class verifies whether SIMD is supported in the current environment and
 * loads the SIMD files only if support is detected. The returned filesets
 * require that the Wasm files are published without renaming. If this is not
 * possible, you can invoke the MediaPipe Tasks APIs using a manually created
 * `WasmFileset`.
 */
export declare class FilesetResolver {
    /**
     * Returns whether SIMD is supported in the current environment.
     *
     * If your environment requires custom locations for the MediaPipe Wasm files,
     * you can use `isSimdSupported()` to decide whether to load the SIMD-based
     * assets.
     *
     * @return Whether SIMD support was detected in the current environment.
     */
    static isSimdSupported(): Promise<boolean>;
    /**
     * Creates a fileset for the MediaPipe Audio tasks.
     *
     * @param basePath An optional base path to specify the directory the Wasm
     *    files should be loaded from. If not specified, the Wasm files are
     *    loaded from the host's root directory.
     * @return A `WasmFileset` that can be used to initialize MediaPipe Audio
     *    tasks.
     */
    static forAudioTasks(basePath?: string): Promise<WasmFileset>;
    /**
     * Creates a fileset for the MediaPipe Text tasks.
     *
     * @param basePath An optional base path to specify the directory the Wasm
     *    files should be loaded from. If not specified, the Wasm files are
     *    loaded from the host's root directory.
     * @return A `WasmFileset` that can be used to initialize MediaPipe Text
     *    tasks.
     */
    static forTextTasks(basePath?: string): Promise<WasmFileset>;
    /**
     * Creates a fileset for the MediaPipe Vision tasks.
     *
     * @param basePath An optional base path to specify the directory the Wasm
     *    files should be loaded from. If not specified, the Wasm files are
     *    loaded from the host's root directory.
     * @return A `WasmFileset` that can be used to initialize MediaPipe Vision
     *    tasks.
     */
    static forVisionTasks(basePath?: string): Promise<WasmFileset>;
}

/** Performs hand gesture recognition on images. */
export declare class GestureRecognizer extends VisionTaskRunner {
    /**
     * Initializes the Wasm runtime and creates a new gesture recognizer from the
     * provided options.
     * @param wasmFileset A configuration object that provides the location of the
     *     Wasm binary and its loader.
     * @param gestureRecognizerOptions The options for the gesture recognizer.
     *     Note that either a path to the model asset or a model buffer needs to
     *     be provided (via `baseOptions`).
     */
    static createFromOptions(wasmFileset: WasmFileset, gestureRecognizerOptions: GestureRecognizerOptions): Promise<GestureRecognizer>;
    /**
     * Initializes the Wasm runtime and creates a new gesture recognizer based on
     * the provided model asset buffer.
     * @param wasmFileset A configuration object that provides the location of the
     *     Wasm binary and its loader.
     * @param modelAssetBuffer A binary representation of the model.
     */
    static createFromModelBuffer(wasmFileset: WasmFileset, modelAssetBuffer: Uint8Array): Promise<GestureRecognizer>;
    /**
     * Initializes the Wasm runtime and creates a new gesture recognizer based on
     * the path to the model asset.
     * @param wasmFileset A configuration object that provides the location of the
     *     Wasm binary and its loader.
     * @param modelAssetPath The path to the model asset.
     */
    static createFromModelPath(wasmFileset: WasmFileset, modelAssetPath: string): Promise<GestureRecognizer>;
    private constructor();
    /**
     * Sets new options for the gesture recognizer.
     *
     * Calling `setOptions()` with a subset of options only affects those options.
     * You can reset an option back to its default value by explicitly setting it
     * to `undefined`.
     *
     * @param options The options for the gesture recognizer.
     */
    setOptions(options: GestureRecognizerOptions): Promise<void>;
    /**
     * Performs gesture recognition on the provided single image and waits
     * synchronously for the response. Only use this method when the
     * GestureRecognizer is created with running mode `image`.
     *
     * @param image A single image to process.
     * @param imageProcessingOptions the `ImageProcessingOptions` specifying how
     *    to process the input image before running inference.
     * @return The detected gestures.
     */
    recognize(image: ImageSource, imageProcessingOptions?: ImageProcessingOptions): GestureRecognizerResult;
    /**
     * Performs gesture recognition on the provided video frame and waits
     * synchronously for the response. Only use this method when the
     * GestureRecognizer is created with running mode `video`.
     *
     * @param videoFrame A video frame to process.
     * @param timestamp The timestamp of the current frame, in ms.
     * @param imageProcessingOptions the `ImageProcessingOptions` specifying how
     *    to process the input image before running inference.
     * @return The detected gestures.
     */
    recognizeForVideo(videoFrame: ImageSource, timestamp: number, imageProcessingOptions?: ImageProcessingOptions): GestureRecognizerResult;
}

/** Options to configure the MediaPipe Gesture Recognizer Task */
export declare interface GestureRecognizerOptions extends VisionTaskOptions {
    /**
     * The maximum number of hands can be detected by the GestureRecognizer.
     * Defaults to 1.
     */
    numHands?: number | undefined;
    /**
     * The minimum confidence score for the hand detection to be considered
     * successful. Defaults to 0.5.
     */
    minHandDetectionConfidence?: number | undefined;
    /**
     * The minimum confidence score of hand presence score in the hand landmark
     * detection. Defaults to 0.5.
     */
    minHandPresenceConfidence?: number | undefined;
    /**
     * The minimum confidence score for the hand tracking to be considered
     * successful. Defaults to 0.5.
     */
    minTrackingConfidence?: number | undefined;
    /**
     * Sets the optional `ClassifierOptions` controling the canned gestures
     * classifier, such as score threshold, allow list and deny list of gestures.
     * The categories for canned gesture
     * classifiers are: ["None", "Closed_Fist", "Open_Palm", "Pointing_Up",
     * "Thumb_Down", "Thumb_Up", "Victory", "ILoveYou"]
     */
    cannedGesturesClassifierOptions?: ClassifierOptions | undefined;
    /**
     * Options for configuring the custom gestures classifier, such as score
     * threshold, allow list and deny list of gestures.
     */
    customGesturesClassifierOptions?: ClassifierOptions | undefined;
}

/**
 * Represents the gesture recognition results generated by `GestureRecognizer`.
 */
export declare interface GestureRecognizerResult {
    /** Hand landmarks of detected hands. */
    landmarks: NormalizedLandmark[][];
    /** Hand landmarks in world coordniates of detected hands. */
    worldLandmarks: Landmark[][];
    /** Handedness of detected hands. */
    handednesses: Category[][];
    /**
     * Recognized hand gestures of detected hands. Note that the index of the
     * gesture is always -1, because the raw indices from multiple gesture
     * classifiers cannot consolidate to a meaningful index.
     */
    gestures: Category[][];
}

/** Performs hand landmarks detection on images. */
export declare class HandLandmarker extends VisionTaskRunner {
    /**
     * Initializes the Wasm runtime and creates a new `HandLandmarker` from the
     * provided options.
     * @param wasmFileset A configuration object that provides the location of the
     *     Wasm binary and its loader.
     * @param handLandmarkerOptions The options for the HandLandmarker.
     *     Note that either a path to the model asset or a model buffer needs to
     *     be provided (via `baseOptions`).
     */
    static createFromOptions(wasmFileset: WasmFileset, handLandmarkerOptions: HandLandmarkerOptions): Promise<HandLandmarker>;
    /**
     * Initializes the Wasm runtime and creates a new `HandLandmarker` based on
     * the provided model asset buffer.
     * @param wasmFileset A configuration object that provides the location of the
     *     Wasm binary and its loader.
     * @param modelAssetBuffer A binary representation of the model.
     */
    static createFromModelBuffer(wasmFileset: WasmFileset, modelAssetBuffer: Uint8Array): Promise<HandLandmarker>;
    /**
     * Initializes the Wasm runtime and creates a new `HandLandmarker` based on
     * the path to the model asset.
     * @param wasmFileset A configuration object that provides the location of the
     *     Wasm binary and its loader.
     * @param modelAssetPath The path to the model asset.
     */
    static createFromModelPath(wasmFileset: WasmFileset, modelAssetPath: string): Promise<HandLandmarker>;
    private constructor();
    /**
     * Sets new options for this `HandLandmarker`.
     *
     * Calling `setOptions()` with a subset of options only affects those options.
     * You can reset an option back to its default value by explicitly setting it
     * to `undefined`.
     *
     * @param options The options for the hand landmarker.
     */
    setOptions(options: HandLandmarkerOptions): Promise<void>;
    /**
     * Performs hand landmarks detection on the provided single image and waits
     * synchronously for the response. Only use this method when the
     * HandLandmarker is created with running mode `image`.
     *
     * @param image An image to process.
     * @param imageProcessingOptions the `ImageProcessingOptions` specifying how
     *    to process the input image before running inference.
     * @return The detected hand landmarks.
     */
    detect(image: ImageSource, imageProcessingOptions?: ImageProcessingOptions): HandLandmarkerResult;
    /**
     * Performs hand landmarks detection on the provided video frame and waits
     * synchronously for the response. Only use this method when the
     * HandLandmarker is created with running mode `video`.
     *
     * @param videoFrame A video frame to process.
     * @param timestamp The timestamp of the current frame, in ms.
     * @param imageProcessingOptions the `ImageProcessingOptions` specifying how
     *    to process the input image before running inference.
     * @return The detected hand landmarks.
     */
    detectForVideo(videoFrame: ImageSource, timestamp: number, imageProcessingOptions?: ImageProcessingOptions): HandLandmarkerResult;
}

/** Options to configure the MediaPipe HandLandmarker Task */
export declare interface HandLandmarkerOptions extends VisionTaskOptions {
    /**
     * The maximum number of hands can be detected by the HandLandmarker.
     * Defaults to 1.
     */
    numHands?: number | undefined;
    /**
     * The minimum confidence score for the hand detection to be considered
     * successful. Defaults to 0.5.
     */
    minHandDetectionConfidence?: number | undefined;
    /**
     * The minimum confidence score of hand presence score in the hand landmark
     * detection. Defaults to 0.5.
     */
    minHandPresenceConfidence?: number | undefined;
    /**
     * The minimum confidence score for the hand tracking to be considered
     * successful. Defaults to 0.5.
     */
    minTrackingConfidence?: number | undefined;
}

/**
 * Represents the hand landmarks deection results generated by `HandLandmarker`.
 */
export declare interface HandLandmarkerResult {
    /** Hand landmarks of detected hands. */
    landmarks: NormalizedLandmark[][];
    /** Hand landmarks in world coordniates of detected hands. */
    worldLandmarks: Landmark[][];
    /** Handedness of detected hands. */
    handednesses: Category[][];
}

/** Performs classification on images. */
export declare class ImageClassifier extends VisionTaskRunner {
    /**
     * Initializes the Wasm runtime and creates a new image classifier from the
     * provided options.
     * @param wasmFileset A configuration object that provides the location
     *     Wasm binary and its loader.
     * @param imageClassifierOptions The options for the image classifier. Note
     *     that either a path to the model asset or a model buffer needs to be
     *     provided (via `baseOptions`).
     */
    static createFromOptions(wasmFileset: WasmFileset, imageClassifierOptions: ImageClassifierOptions): Promise<ImageClassifier>;
    /**
     * Initializes the Wasm runtime and creates a new image classifier based on
     * the provided model asset buffer.
     * @param wasmFileset A configuration object that provides the location of the
     *     Wasm binary and its loader.
     * @param modelAssetBuffer A binary representation of the model.
     */
    static createFromModelBuffer(wasmFileset: WasmFileset, modelAssetBuffer: Uint8Array): Promise<ImageClassifier>;
    /**
     * Initializes the Wasm runtime and creates a new image classifier based on
     * the path to the model asset.
     * @param wasmFileset A configuration object that provides the location of the
     *     Wasm binary and its loader.
     * @param modelAssetPath The path to the model asset.
     */
    static createFromModelPath(wasmFileset: WasmFileset, modelAssetPath: string): Promise<ImageClassifier>;
    private constructor();
    /**
     * Sets new options for the image classifier.
     *
     * Calling `setOptions()` with a subset of options only affects those options.
     * You can reset an option back to its default value by explicitly setting it
     * to `undefined`.
     *
     * @param options The options for the image classifier.
     */
    setOptions(options: ImageClassifierOptions): Promise<void>;
    /**
     * Performs image classification on the provided single image and waits
     * synchronously for the response. Only use this method when the
     * ImageClassifier is created with running mode `image`.
     *
     * @param image An image to process.
     * @param imageProcessingOptions the `ImageProcessingOptions` specifying how
     *    to process the input image before running inference.
     * @return The classification result of the image
     */
    classify(image: ImageSource, imageProcessingOptions?: ImageProcessingOptions): ImageClassifierResult;
    /**
     * Performs image classification on the provided video frame and waits
     * synchronously for the response. Only use this method when the
     * ImageClassifier is created with running mode `video`.
     *
     * @param videoFrame A video frame to process.
     * @param timestamp The timestamp of the current frame, in ms.
     * @param imageProcessingOptions the `ImageProcessingOptions` specifying how
     *    to process the input image before running inference.
     * @return The classification result of the image
     */
    classifyForVideo(videoFrame: ImageSource, timestamp: number, imageProcessingOptions?: ImageProcessingOptions): ImageClassifierResult;
}

/** Options to configure the MediaPipe Image Classifier Task. */
export declare interface ImageClassifierOptions extends ClassifierOptions, VisionTaskOptions {
}

/** Classification results of a model. */
export declare interface ImageClassifierResult {
    /** The classification results for each head of the model. */
    classifications: Classifications[];
    /**
     * The optional timestamp (in milliseconds) of the start of the chunk of data
     * corresponding to these results.
     *
     * This is only used for classification on time series (e.g. audio
     * classification). In these use cases, the amount of data to process might
     * exceed the maximum size that the model can process: to solve this, the
     * input data is split into multiple chunks starting at different timestamps.
     */
    timestampMs?: number;
}

/** Performs embedding extraction on images. */
export declare class ImageEmbedder extends VisionTaskRunner {
    /**
     * Initializes the Wasm runtime and creates a new image embedder from the
     * provided options.
     * @param wasmFileset A configuration object that provides the location of the
     *     Wasm binary and its loader.
     * @param imageEmbedderOptions The options for the image embedder. Note that
     *     either a path to the TFLite model or the model itself needs to be
     *     provided (via `baseOptions`).
     */
    static createFromOptions(wasmFileset: WasmFileset, imageEmbedderOptions: ImageEmbedderOptions): Promise<ImageEmbedder>;
    /**
     * Initializes the Wasm runtime and creates a new image embedder based on the
     * provided model asset buffer.
     * @param wasmFileset A configuration object that provides the location of the
     *     Wasm binary and its loader.
     * @param modelAssetBuffer A binary representation of the TFLite model.
     */
    static createFromModelBuffer(wasmFileset: WasmFileset, modelAssetBuffer: Uint8Array): Promise<ImageEmbedder>;
    /**
     * Initializes the Wasm runtime and creates a new image embedder based on the
     * path to the model asset.
     * @param wasmFileset A configuration object that provides the location of the
     *     Wasm binary and its loader.
     * @param modelAssetPath The path to the TFLite model.
     */
    static createFromModelPath(wasmFileset: WasmFileset, modelAssetPath: string): Promise<ImageEmbedder>;
    private constructor();
    /**
     * Sets new options for the image embedder.
     *
     * Calling `setOptions()` with a subset of options only affects those options.
     * You can reset an option back to its default value by explicitly setting it
     * to `undefined`.
     *
     * @param options The options for the image embedder.
     */
    setOptions(options: ImageEmbedderOptions): Promise<void>;
    /**
     * Performs embedding extraction on the provided single image and waits
     * synchronously for the response. Only use this method when the
     * ImageEmbedder is created with running mode `image`.
     *
     * @param image The image to process.
     * @param imageProcessingOptions the `ImageProcessingOptions` specifying how
     *    to process the input image before running inference.
     * @return The classification result of the image
     */
    embed(image: ImageSource, imageProcessingOptions?: ImageProcessingOptions): ImageEmbedderResult;
    /**
     * Performs embedding extraction on the provided video frame and waits
     * synchronously for the response. Only use this method when the
     * ImageEmbedder is created with running mode `video`.
     *
     * @param imageFrame The image frame to process.
     * @param timestamp The timestamp of the current frame, in ms.
     * @param imageProcessingOptions the `ImageProcessingOptions` specifying how
     *    to process the input image before running inference.
     * @return The classification result of the image
     */
    embedForVideo(imageFrame: ImageSource, timestamp: number, imageProcessingOptions?: ImageProcessingOptions): ImageEmbedderResult;
    /**
     * Utility function to compute cosine similarity[1] between two `Embedding`
     * objects.
     *
     * [1]: https://en.wikipedia.org/wiki/Cosine_similarity
     *
     * @throws if the embeddings are of different types(float vs. quantized), have
     *     different sizes, or have an L2-norm of 0.
     */
    static cosineSimilarity(u: Embedding, v: Embedding): number;
}

/** Options for configuring a MediaPipe Image Embedder task. */
export declare interface ImageEmbedderOptions extends EmbedderOptions, VisionTaskOptions {
}

/**  Embedding results for a given embedder model. */
export declare interface ImageEmbedderResult {
    /**
     * The embedding results for each model head, i.e. one for each output tensor.
     */
    embeddings: Embedding[];
    /**
     * The optional timestamp (in milliseconds) of the start of the chunk of
     * data corresponding to these results.
     *
     * This is only used for embedding extraction on time series (e.g. audio
     * embedding). In these use cases, the amount of data to process might
     * exceed the maximum size that the model can process: to solve this, the
     * input data is split into multiple chunks starting at different timestamps.
     */
    timestampMs?: number;
}

/**
 * Options for image processing.
 *
 * If both region-or-interest and rotation are specified, the crop around the
 * region-of-interest is extracted first, then the specified rotation is applied
 * to the crop.
 */
declare interface ImageProcessingOptions {
    /**
     * The optional region-of-interest to crop from the image. If not specified,
     * the full image is used.
     *
     * Coordinates must be in [0,1] with 'left' < 'right' and 'top' < bottom.
     */
    regionOfInterest?: RectF;
    /**
     * The rotation to apply to the image (or cropped region-of-interest), in
     * degrees clockwise.
     *
     * The rotation must be a multiple (positive or negative) of 90°.
     */
    rotationDegrees?: number;
}

/** Performs image segmentation on images. */
export declare class ImageSegmenter extends VisionTaskRunner {
    /**
     * Initializes the Wasm runtime and creates a new image segmenter from the
     * provided options.
     * @param wasmFileset A configuration object that provides the location of
     *     the Wasm binary and its loader.
     * @param imageSegmenterOptions The options for the Image Segmenter. Note
     *     that either a path to the model asset or a model buffer needs to be
     *     provided (via `baseOptions`).
     */
    static createFromOptions(wasmFileset: WasmFileset, imageSegmenterOptions: ImageSegmenterOptions): Promise<ImageSegmenter>;
    /**
     * Initializes the Wasm runtime and creates a new image segmenter based on
     * the provided model asset buffer.
     * @param wasmFileset A configuration object that provides the location of
     *     the Wasm binary and its loader.
     * @param modelAssetBuffer A binary representation of the model.
     */
    static createFromModelBuffer(wasmFileset: WasmFileset, modelAssetBuffer: Uint8Array): Promise<ImageSegmenter>;
    /**
     * Initializes the Wasm runtime and creates a new image segmenter based on
     * the path to the model asset.
     * @param wasmFileset A configuration object that provides the location of
     *     the Wasm binary and its loader.
     * @param modelAssetPath The path to the model asset.
     */
    static createFromModelPath(wasmFileset: WasmFileset, modelAssetPath: string): Promise<ImageSegmenter>;
    private constructor();
    /**
     * Sets new options for the image segmenter.
     *
     * Calling `setOptions()` with a subset of options only affects those
     * options. You can reset an option back to its default value by
     * explicitly setting it to `undefined`.
     *
     * @param options The options for the image segmenter.
     */
    setOptions(options: ImageSegmenterOptions): Promise<void>;
    /**
     * Performs image segmentation on the provided single image and invokes the
     * callback with the response. The method returns synchronously once the
     * callback returns. Only use this method when the ImageSegmenter is
     * created with running mode `image`.
     *
     * @param image An image to process.
     * @param callback The callback that is invoked with the segmented masks. The
     *    lifetime of the returned data is only guaranteed for the duration of the
     *    callback.
     */
    segment(image: ImageSource, callback: SegmentationMaskCallback): void;
    /**
     * Performs image segmentation on the provided single image and invokes the
     * callback with the response. The method returns synchronously once the
     * callback returns. Only use this method when the ImageSegmenter is
     * created with running mode `image`.
     *
     * @param image An image to process.
     * @param imageProcessingOptions the `ImageProcessingOptions` specifying how
     *    to process the input image before running inference.
     * @param callback The callback that is invoked with the segmented masks. The
     *    lifetime of the returned data is only guaranteed for the duration of the
     *    callback.
     */
    segment(image: ImageSource, imageProcessingOptions: ImageProcessingOptions, callback: SegmentationMaskCallback): void;
    /**
     * Performs image segmentation on the provided video frame and invokes the
     * callback with the response. The method returns synchronously once the
     * callback returns. Only use this method when the ImageSegmenter is
     * created with running mode `video`.
     *
     * @param videoFrame A video frame to process.
     * @param timestamp The timestamp of the current frame, in ms.
     * @param callback The callback that is invoked with the segmented masks. The
     *    lifetime of the returned data is only guaranteed for the duration of the
     *    callback.
     */
    segmentForVideo(videoFrame: ImageSource, timestamp: number, callback: SegmentationMaskCallback): void;
    /**
     * Performs image segmentation on the provided video frame and invokes the
     * callback with the response. The method returns synchronously once the
     * callback returns. Only use this method when the ImageSegmenter is
     * created with running mode `video`.
     *
     * @param videoFrame A video frame to process.
     * @param imageProcessingOptions the `ImageProcessingOptions` specifying how
     *    to process the input image before running inference.
     * @param timestamp The timestamp of the current frame, in ms.
     * @param callback The callback that is invoked with the segmented masks. The
     *    lifetime of the returned data is only guaranteed for the duration of the
     *    callback.
     */
    segmentForVideo(videoFrame: ImageSource, imageProcessingOptions: ImageProcessingOptions, timestamp: number, callback: SegmentationMaskCallback): void;
}

/** Options to configure the MediaPipe Image Segmenter Task */
export declare interface ImageSegmenterOptions extends VisionTaskOptions {
    /**
     * The locale to use for display names specified through the TFLite Model
     * Metadata, if any. Defaults to English.
     */
    displayNamesLocale?: string | undefined;
    /**
     * The output type of segmentation results.
     *
     * The two supported modes are:
     * - Category Mask:   Gives a single output mask where each pixel represents
     *                    the class which the pixel in the original image was
     *                    predicted to belong to.
     * - Confidence Mask: Gives a list of output masks (one for each class). For
     *                    each mask, the pixel represents the prediction
     *                    confidence, usually in the [0.0, 0.1] range.
     *
     * Defaults to `CATEGORY_MASK`.
     */
    outputType?: "CATEGORY_MASK" | "CONFIDENCE_MASK" | undefined;
}

/**
 * Valid types of image sources which we can run our GraphRunner over.
 */
export declare type ImageSource = HTMLCanvasElement | HTMLVideoElement | HTMLImageElement | ImageData | ImageBitmap;

/**
 * Landmark represents a point in 3D space with x, y, z coordinates. The
 * landmark coordinates are in meters. z represents the landmark depth,
 * and the smaller the value the closer the world landmark is to the camera.
 */
export declare interface Landmark {
    /** The x coordinates of the landmark. */
    x: number;
    /** The y coordinates of the landmark. */
    y: number;
    /** The z coordinates of the landmark. */
    z: number;
}

/**
 * Copyright 2022 The MediaPipe Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Normalized Landmark represents a point in 3D space with x, y, z coordinates.
 * x and y are normalized to [0.0, 1.0] by the image width and height
 * respectively. z represents the landmark depth, and the smaller the value the
 * closer the landmark is to the camera. The magnitude of z uses roughly the
 * same scale as x.
 */
export declare interface NormalizedLandmark {
    /** The x coordinates of the normalized landmark. */
    x: number;
    /** The y coordinates of the normalized landmark. */
    y: number;
    /** The z coordinates of the normalized landmark. */
    z: number;
}

/** Performs object detection on images. */
export declare class ObjectDetector extends VisionTaskRunner {
    /**
     * Initializes the Wasm runtime and creates a new object detector from the
     * provided options.
     * @param wasmFileset A configuration object that provides the location of the
     *     Wasm binary and its loader.
     * @param objectDetectorOptions The options for the Object Detector. Note that
     *     either a path to the model asset or a model buffer needs to be
     *     provided (via `baseOptions`).
     */
    static createFromOptions(wasmFileset: WasmFileset, objectDetectorOptions: ObjectDetectorOptions): Promise<ObjectDetector>;
    /**
     * Initializes the Wasm runtime and creates a new object detector based on the
     * provided model asset buffer.
     * @param wasmFileset A configuration object that provides the location of the
     *     Wasm binary and its loader.
     * @param modelAssetBuffer A binary representation of the model.
     */
    static createFromModelBuffer(wasmFileset: WasmFileset, modelAssetBuffer: Uint8Array): Promise<ObjectDetector>;
    /**
     * Initializes the Wasm runtime and creates a new object detector based on the
     * path to the model asset.
     * @param wasmFileset A configuration object that provides the location of the
     *     Wasm binary and its loader.
     * @param modelAssetPath The path to the model asset.
     */
    static createFromModelPath(wasmFileset: WasmFileset, modelAssetPath: string): Promise<ObjectDetector>;
    private constructor();
    /**
     * Sets new options for the object detector.
     *
     * Calling `setOptions()` with a subset of options only affects those options.
     * You can reset an option back to its default value by explicitly setting it
     * to `undefined`.
     *
     * @param options The options for the object detector.
     */
    setOptions(options: ObjectDetectorOptions): Promise<void>;
    /**
     * Performs object detection on the provided single image and waits
     * synchronously for the response. Only use this method when the
     * ObjectDetector is created with running mode `image`.
     *
     * @param image An image to process.
     * @param imageProcessingOptions the `ImageProcessingOptions` specifying how
     *    to process the input image before running inference.
     * @return The list of detected objects
     */
    detect(image: ImageSource, imageProcessingOptions?: ImageProcessingOptions): Detection[];
    /**
     * Performs object detection on the provided video frame and waits
     * synchronously for the response. Only use this method when the
     * ObjectDetector is created with running mode `video`.
     *
     * @param videoFrame A video frame to process.
     * @param timestamp The timestamp of the current frame, in ms.
     * @param imageProcessingOptions the `ImageProcessingOptions` specifying how
     *    to process the input image before running inference.
     * @return The list of detected objects
     */
    detectForVideo(videoFrame: ImageSource, timestamp: number, imageProcessingOptions?: ImageProcessingOptions): Detection[];
}

/** Options to configure the MediaPipe Object Detector Task */
export declare interface ObjectDetectorOptions extends VisionTaskOptions, ClassifierOptions {
}

/**
 * Defines a rectangle, used e.g. as part of detection results or as input
 * region-of-interest.
 *
 * The coordinates are normalized with respect to the image dimensions, i.e.
 * generally in [0,1] but they may exceed these bounds if describing a region
 * overlapping the image. The origin is on the top-left corner of the image.
 */
declare interface RectF {
    left: number;
    top: number;
    right: number;
    bottom: number;
}

/**
 * The two running modes of a vision task.
 * 1) The image mode for processing single image inputs.
 * 2) The video mode for processing decoded frames of a video.
 */
declare type RunningMode = "IMAGE" | "VIDEO";

/**
 * The ImageSegmenter returns the segmentation result as a Uint8Array (when
 * the default mode of `CATEGORY_MASK` is used) or as a Float32Array (for
 * output type `CONFIDENCE_MASK`). The `WebGLTexture` output type is reserved
 * for future usage.
 */
export declare type SegmentationMask = Uint8Array | Float32Array | WebGLTexture;

/**
 * A callback that receives the computed masks from the image segmenter. The
 * callback either receives a single element array with a category mask (as a
 * `[Uint8Array]`) or multiple confidence masks (as a `Float32Array[]`).
 * The returned data is only valid for the duration of the callback. If
 * asynchronous processing is needed, all data needs to be copied before the
 * callback returns.
 */
export declare type SegmentationMaskCallback = (masks: SegmentationMask[], width: number, height: number) => void;

/** Base class for all MediaPipe Tasks. */
declare abstract class TaskRunner {
    protected constructor();
    /** Configures the task with custom options. */
    abstract setOptions(options: TaskRunnerOptions): Promise<void>;
}

/** Options to configure MediaPipe Tasks in general. */
declare interface TaskRunnerOptions {
    /** Options to configure the loading of the model assets. */
    baseOptions?: BaseOptions_2;
}

/** The options for configuring a MediaPipe vision task. */
declare interface VisionTaskOptions extends TaskRunnerOptions {
    /**
     * The running mode of the task. Default to the image mode.
     * Vision tasks have two running modes:
     * 1) The image mode for processing single image inputs.
     * 2) The video mode for processing decoded frames of a video.
     */
    runningMode?: RunningMode;
}

/** Base class for all MediaPipe Vision Tasks. */
declare abstract class VisionTaskRunner extends TaskRunner {
    protected constructor();
    /** Configures the shared options of a vision task. */
    applyOptions(options: VisionTaskOptions): Promise<void>;
}

/**
 * Copyright 2022 The MediaPipe Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/** An object containing the locations of the Wasm assets */
declare interface WasmFileset {
    /** The path to the Wasm loader script. */
    wasmLoaderPath: string;
    /** The path to the Wasm binary. */
    wasmBinaryPath: string;
}

export { }
