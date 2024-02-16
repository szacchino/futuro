# Progetto Futuro
# Università del Salento
#
# Ing. Sandro Zacchino
# sandro.zacchino@unisalento.it
#
# Esempio di acquisizione di face encodings e successivo riconoscimento

import face_recognition
import cv2
import numpy as np
import os
import pickle

path = "./encodings"
dir_list = os.listdir(path)
known_face_encodings = []
known_face_names = []
if len(dir_list):
    print("Loading encodings...")
    for f in dir_list:
        # Load a sample picture and learn how to recognize it.
        filename = path + "/" + f
        print("  loading ", f)
        file = open(filename, 'rb')
        encoding = pickle.load(file)
        file.close()
        known_face_encodings.append(encoding)
        known_face_names.append(f[:-4])

video_capture = cv2.VideoCapture(0)

face_locations = []
face_encodings = []
face_names = []
process_this_frame = True
ratio = 3.0
FONT = cv2.FONT_HERSHEY_DUPLEX
RED = (0, 0, 255)
BLACK = (0, 0, 0)
WHITE = (255, 255, 255)

while True:
    key = cv2.waitKey(10)
    # Apro la webcam di indice 0
    ret, img = video_capture.read()
    if ret:
        frame = img.copy()

        # Eseguo il riconoscimento ogni due frame per risparmiare tempo
        if process_this_frame:
            # Resize frame of video to 1/4 size for faster face recognition processing
            small_frame = cv2.resize(frame, (0, 0), fx=1/ratio, fy=1/ratio)

            # Convert the image from BGR color (which OpenCV uses) to RGB color (which face_recognition uses)
            rgb_small_frame = cv2.cvtColor(small_frame, cv2.COLOR_BGR2RGB) 
            
            # Find all the faces and face encodings in the current frame of video
            face_locations = face_recognition.face_locations(rgb_small_frame)
            # print(face_locations)
            face_encodings = face_recognition.face_encodings(rgb_small_frame, face_locations)

            face_names = []
            for face_encoding in face_encodings:
                # See if the face is a match for the known face(s)
                matches = face_recognition.compare_faces(known_face_encodings, face_encoding)
                name = "Unknown"

                # # If a match was found in known_face_encodings, just use the first one.
                # if True in matches:
                #     first_match_index = matches.index(True)
                #     name = known_face_names[first_match_index]

                # Or instead, use the known face with the smallest distance to the new face
                face_distances = face_recognition.face_distance(known_face_encodings, face_encoding)
                if (len(face_distances)):
                    best_match_index = np.argmin(face_distances)
                    if matches[best_match_index]:
                        name = known_face_names[best_match_index]
                        print(name)
                
                

                if not face_encoding is None and key == ord('a'):
                    new_facename = input("Inserire il nome del file: ")
                    # img_name = f"faces/{new_facename}.png"
                    enc_name = f"encodings/{new_facename}.enc"
                    # cv2.imwrite(img_name, img)
                    file = open(enc_name, 'wb')
                    pickle.dump(face_encoding, file)
                    file.close()
                    known_face_encodings.append(face_encoding)
                    known_face_names.append(new_facename)
                face_names.append(name)

        process_this_frame = not process_this_frame

        # Display the results
        for (top, right, bottom, left), name in zip(face_locations, face_names):
            # Scale back up face locations since the frame we detected in was scaled to 1/4 size
            top *= round(ratio)
            right *= round(ratio)
            bottom *= round(ratio)
            left *= round(ratio)

            # Draw a box around the face
            cv2.rectangle(frame, (left, top), (right, bottom), RED, 2)

            # Draw a label with a name below the face
            cv2.rectangle(frame, (left, bottom - 35), (right, bottom), RED, cv2.FILLED)
            
            cv2.putText(frame, name, (left + 6, bottom - 6), FONT, 1.0, WHITE, 1, cv2.LINE_AA)
        

        

        # Hit 'q' on the keyboard to quit!
        
        if key == ord('q'):
            break
        elif key == ord('=') or key == ord("+"):
            ratio += 1
        elif key == ord("-"):
            ratio -= 1
            if ratio < 1: 
                ratio = 1
        elif key == ord("r"):
            ratio -= 4
        cv2.rectangle(frame, (0, 0), (300, 30), WHITE, cv2.FILLED)
        cv2.putText(frame, f"Ratio: {ratio}", (10, 20), FONT, .5, BLACK, 1, cv2.LINE_AA)
        s = frame.shape
        ss = small_frame.shape
        frame[s[0] - ss[0]:, :ss[1]] = small_frame
        # Display the resulting image
        cv2.imshow('Video', frame)
# Release handle to the webcam
video_capture.release()
cv2.destroyAllWindows()
