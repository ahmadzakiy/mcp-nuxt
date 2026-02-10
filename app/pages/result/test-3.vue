<template>
  <MpFlex direction="column" gap="4" padding="6">
    <MpButton variant="primary" @click="isDrawerOpen = true">
      Open Customer Support Drawer
    </MpButton>

    <MpDrawer
      id="customer-support-drawer"
      :is-open="isDrawerOpen"
      size="full"
      placement="right"
      :is-block-scroll-on-mount="true"
      :is-close-on-esc="true"
      :is-close-on-overlay-click="true"
      @close="onCloseDrawer"
    >
      <MpDrawerContent>
        <!-- Header -->
        <MpDrawerHeader>
          <MpText weight="semiBold" color="text.default">
            Customer support
          </MpText>
          <MpDrawerCloseButton />
        </MpDrawerHeader>

        <!-- Main Content -->
        <MpDrawerBody :class="css({ padding: '0', overflow: 'hidden' })">
          <MpFlex height="full" width="full">
            <!-- Left Panel: Stats + Question Table -->
            <MpFlex
              direction="column"
              gap="6"
              padding="6"
              backgroundColor="background.stage"
              :class="
                css({
                  flex: '1 0 0',
                  minWidth: '500px',
                  maxWidth: '700px',
                  overflowY: 'auto'
                })
              "
            >
              <!-- Stats Card -->
              <MpFlex
                direction="column"
                gap="4"
                padding="4"
                backgroundColor="background.neutral"
                :class="
                  css({
                    border: '1px solid',
                    borderColor: 'border.default',
                    borderRadius: 'md'
                  })
                "
              >
                <!-- Header -->
                <MpText size="h2" weight="semiBold" color="text.default">
                  Customer support
                </MpText>

                <!-- Accuracy Rate -->
                <MpFlex direction="column" gap="2">
                  <MpFlex alignItems="center" gap="1">
                    <MpText color="text.secondary"> Accuracy rate </MpText>
                    <MpIcon name="info" size="sm" color="icon.default" />
                  </MpFlex>

                  <MpFlex direction="column" gap="2">
                    <MpFlex alignItems="center" gap="2">
                      <MpText size="h2" weight="semiBold" color="text.default">
                        82%
                      </MpText>
                      <MpBadge for="additionalInformation" type="completed">
                        Ready
                      </MpBadge>
                    </MpFlex>

                    <!-- Progress Bar -->
                    <MpProgress
                      value="82"
                      color="positive"
                      size="sm"
                      variant="linear"
                    />
                  </MpFlex>
                </MpFlex>

                <!-- Information Banner -->
                <MpBanner
                  id="knowledge-banner"
                  variant="info"
                  :class="css({ width: 'full' })"
                >
                  <MpBannerIcon id="knowledge-banner-icon" />
                  <MpBannerDescription id="knowledge-banner-desc">
                    A common inquiry is about how to refund a product. Let's
                    enhance your knowledge resources on this topic.
                    <MpText
                      as="span"
                      color="text.link"
                      :class="css({ cursor: 'pointer' })"
                    >
                      Add knowledge
                    </MpText>
                  </MpBannerDescription>
                </MpBanner>
              </MpFlex>

              <!-- Question Group Table -->
              <MpFlex direction="column">
                <MpTableContainer>
                  <MpTable :is-hoverable="true">
                    <MpTableHead>
                      <MpTableRow>
                        <MpTableCell
                          as="th"
                          scope="col"
                          :class="
                            css({
                              backgroundColor: 'background.surface',
                              padding: '4'
                            })
                          "
                        >
                          <MpFlex alignItems="center" gap="2">
                            <MpText weight="semiBold"> Question group </MpText>
                            <MpIcon
                              name="filter"
                              size="sm"
                              color="icon.default"
                            />
                          </MpFlex>
                        </MpTableCell>
                      </MpTableRow>
                    </MpTableHead>

                    <MpTableBody>
                      <MpTableRow
                        v-for="question in questionGroups"
                        :key="question.id"
                        :class="
                          css({
                            backgroundColor:
                              question.id === 1
                                ? 'background.neutral.selected'
                                : 'background.neutral'
                          })
                        "
                      >
                        <MpTableCell
                          as="td"
                          :class="
                            css({
                              padding: '2 4',
                              minHeight: '52px'
                            })
                          "
                        >
                          <MpText color="text.link">
                            {{ question.title }}
                          </MpText>
                        </MpTableCell>
                      </MpTableRow>
                    </MpTableBody>
                  </MpTable>
                </MpTableContainer>
              </MpFlex>
            </MpFlex>

            <!-- Right Panel: Answer Comparison -->
            <MpFlex
              direction="column"
              gap="4"
              padding="6"
              :class="
                css({
                  flex: '1 0 0',
                  minWidth: '940px',
                  overflowY: 'auto',
                  background:
                    'linear-gradient(159.47deg, #EEF0FC 0%, #F3F1FC 100.81%)'
                })
              "
            >
              <!-- Section Header -->
              <MpFlex direction="column" gap="0.5">
                <MpText size="h2" weight="semiBold" color="text.default">
                  Answer comparison
                </MpText>
                <MpText color="text.secondary">
                  Explore the differences between AI and human agents in
                  providing answers.
                </MpText>
              </MpFlex>

              <!-- Question Cards -->
              <MpFlex direction="column" gap="4" paddingBottom="10">
                <!-- Collapsed Question Cards -->
                <MpFlex
                  v-for="(card, index) in collapsedCards"
                  :key="index"
                  direction="column"
                  padding="4"
                  backgroundColor="background.neutral.hovered"
                  borderRadius="lg"
                  cursor="pointer"
                  @click="expandCard(index)"
                >
                  <MpFlex
                    alignItems="center"
                    gap="3"
                    justifyContent="space-between"
                  >
                    <MpFlex alignItems="center" gap="3" flex="1">
                      <MpIcon name="help" size="sm" color="icon.default" />
                      <MpText color="text.default">
                        {{ card.question }}
                      </MpText>
                    </MpFlex>
                    <MpFlex alignItems="center" gap="2">
                      <MpText color="text.placeholder"> No review yet </MpText>
                      <MpIcon
                        name="chevrons-down"
                        size="sm"
                        color="icon.default"
                      />
                    </MpFlex>
                  </MpFlex>
                </MpFlex>

                <!-- Expanded Question Card -->
                <MpFlex
                  direction="column"
                  backgroundColor="background.neutral.hovered"
                  borderRadius="lg"
                  boxShadow="md"
                >
                  <!-- Question Header -->
                  <MpFlex
                    alignItems="center"
                    gap="3"
                    justifyContent="space-between"
                    padding="4"
                    cursor="pointer"
                  >
                    <MpFlex alignItems="center" gap="3" flex="1">
                      <MpIcon name="help" size="sm" color="icon.default" />
                      <MpText color="text.default">
                        Halo Kak! Mau tanya dong, kalau barangnya ternyata
                        kurang cocok, cara urus refund-nya gimana ya?
                      </MpText>
                    </MpFlex>
                    <MpIcon name="chevrons-up" size="sm" color="icon.default" />
                  </MpFlex>

                  <!-- Answer Comparison -->
                  <MpFlex
                    padding="4"
                    gap="4"
                    backgroundColor="background.neutral"
                    borderRadius="md"
                  >
                    <!-- Human Agent Column -->
                    <MpFlex direction="column" flex="1" paddingBottom="12">
                      <MpFlex
                        direction="column"
                        backgroundColor="background.neutral.hovered"
                        borderRadius="lg"
                        height="full"
                      >
                        <!-- Human Agent Answer -->
                        <MpFlex
                          direction="column"
                          gap="4"
                          padding="4"
                          backgroundColor="background.neutral"
                          border="1px solid"
                          borderColor="border.default.subtle"
                          borderRadius="lg"
                          flex="1"
                        >
                          <!-- Agent Header -->
                          <MpFlex alignItems="center" gap="3">
                            <MpFlex
                              alignItems="center"
                              justifyContent="center"
                              backgroundColor="background.neutral.hovered"
                              width="8"
                              height="8"
                              borderRadius="md"
                            >
                              <MpIcon
                                name="employee"
                                size="sm"
                                color="icon.default"
                              />
                            </MpFlex>
                            <MpText weight="semiBold"> Human agent </MpText>
                          </MpFlex>

                          <!-- Human Response Text -->
                          <MpFlex
                            direction="column"
                            :class="
                              css({
                                maxHeight: '320px',
                                overflow: 'hidden'
                              })
                            "
                          >
                            <MpText color="text.default">
                              Untuk memulai, bisa tolong informasikan Nomor
                              Pesanan dan alasan spesifik mengapa produk
                              tersebut tidak cocok? Selain itu, pastikan barang
                              masih dalam kondisi baru, label belum dilepas, dan
                              ada video unboxing-nya ya Kak.
                            </MpText>
                            <MpText
                              color="text.default"
                              :class="css({ mt: '2' })"
                            >
                              Setelah Kakak mengirimkan nomor pesanannya, kami
                              akan segera membuatkan tiket pengembalian untuk
                              Kakak. Kami tunggu informasinya, ya Kak!
                            </MpText>
                          </MpFlex>
                        </MpFlex>

                        <!-- Human Response Time -->
                        <MpFlex
                          direction="column"
                          gap="0.5"
                          padding="4"
                          paddingTop="3"
                        >
                          <MpText color="text.secondary">
                            Response time
                          </MpText>
                          <MpText weight="semiBold"> 1.5 minutes </MpText>
                        </MpFlex>
                      </MpFlex>
                    </MpFlex>

                    <!-- AI Agent Column -->
                    <MpFlex direction="column" gap="4" flex="1">
                      <!-- AI Agent Answer -->
                      <MpFlex
                        direction="column"
                        backgroundColor="chart.cat03.bold"
                        borderRadius="lg"
                        overflow="hidden"
                      >
                        <MpFlex
                          direction="column"
                          gap="4"
                          padding="4"
                          backgroundColor="background.highlight"
                          border="2px solid"
                          borderColor="border.selected.disabled"
                          borderRadius="lg"
                        >
                          <!-- AI Agent Header -->
                          <MpFlex alignItems="center" gap="3">
                            <MpFlex
                              alignItems="center"
                              justifyContent="center"
                              backgroundColor="background.neutral"
                              width="8"
                              height="8"
                              borderRadius="md"
                            >
                              <MpIcon
                                name="chatbot"
                                size="sm"
                                color="icon.default"
                              />
                            </MpFlex>
                            <MpText weight="semiBold"> AI agent </MpText>
                          </MpFlex>

                          <!-- AI Response Text -->
                          <MpFlex direction="column">
                            <MpText color="text.default">
                              Halo! Berikut cara mengajukan pengembalian dana:
                            </MpText>
                            <MpText
                              color="text.default"
                              :class="css({ mt: '2' })"
                            >
                              1. Cek Kebijakan: Pastikan produk dalam masa
                              garansi 2-7 hari.
                            </MpText>
                            <MpText
                              color="text.default"
                              :class="css({ mt: '2' })"
                            >
                              2. Siapkan Bukti: Foto produk dan rekam video
                              unboxing.
                            </MpText>
                            <MpText
                              color="text.default"
                              :class="css({ mt: '2' })"
                            >
                              3. Ajukan di Aplikasi: Masuk ke 'Pesanan Saya',
                              pilih produk, lalu klik 'Ajukan Pengembalian'.
                            </MpText>
                            <MpText
                              color="text.default"
                              :class="css({ mt: '2' })"
                            >
                              4. Pilih Alasan: 'Berubah Pikiran' atau 'Produk
                              Tidak Sesuai'.
                            </MpText>
                            <MpText
                              color="text.default"
                              :class="css({ mt: '2' })"
                            >
                              5. Kirim Balik: Kirim barang setelah permohonan
                              disetujui.
                            </MpText>
                            <MpText
                              color="text.default"
                              :class="css({ mt: '2' })"
                            >
                              Butuh bantuan merumuskan alasan refund? Saya siap
                              membantu!
                            </MpText>
                          </MpFlex>

                          <!-- Sources -->
                          <MpFlex direction="column" gap="2">
                            <MpText size="body-small" color="text.secondary">
                              Sources:
                            </MpText>
                            <MpFlex gap="2" flexWrap="wrap">
                              <MpFlex
                                alignItems="center"
                                gap="1.5"
                                padding="2"
                                backgroundColor="background.disabled"
                                borderRadius="sm"
                                maxWidth="200px"
                              >
                                <MpIcon
                                  name="settings"
                                  size="sm"
                                  color="icon.default"
                                />
                                <MpText
                                  size="body-small"
                                  color="text.default"
                                  :class="
                                    css({
                                      overflow: 'hidden',
                                      textOverflow: 'ellipsis',
                                      whiteSpace: 'nowrap'
                                    })
                                  "
                                >
                                  How to refund
                                </MpText>
                              </MpFlex>
                              <MpFlex
                                alignItems="center"
                                gap="1.5"
                                padding="2"
                                backgroundColor="background.disabled"
                                borderRadius="sm"
                                maxWidth="200px"
                              >
                                <MpIcon
                                  name="img"
                                  size="sm"
                                  color="icon.default"
                                />
                                <MpText
                                  size="body-small"
                                  color="text.default"
                                  :class="
                                    css({
                                      overflow: 'hidden',
                                      textOverflow: 'ellipsis',
                                      whiteSpace: 'nowrap'
                                    })
                                  "
                                >
                                  Cara refund
                                </MpText>
                              </MpFlex>
                              <MpFlex
                                alignItems="center"
                                gap="1.5"
                                padding="2"
                                backgroundColor="background.disabled"
                                :class="
                                  css({
                                    borderRadius: 'sm',
                                    maxWidth: '200px'
                                  })
                                "
                              >
                                <MpIcon
                                  name="edit"
                                  size="sm"
                                  color="icon.default"
                                />
                                <MpText
                                  size="body-small"
                                  color="text.default"
                                  :class="
                                    css({
                                      overflow: 'hidden',
                                      textOverflow: 'ellipsis',
                                      whiteSpace: 'nowrap'
                                    })
                                  "
                                >
                                  Refund 2025
                                </MpText>
                              </MpFlex>
                              <MpFlex
                                alignItems="center"
                                gap="1.5"
                                padding="2"
                                backgroundColor="background.disabled"
                                borderRadius="sm"
                                maxWidth="200px"
                              >
                                <MpIcon
                                  name="edit"
                                  size="sm"
                                  color="icon.default"
                                />
                                <MpText
                                  size="body-small"
                                  color="text.default"
                                  :class="
                                    css({
                                      overflow: 'hidden',
                                      textOverflow: 'ellipsis',
                                      whiteSpace: 'nowrap'
                                    })
                                  "
                                >
                                  Cara refund & return terbaru 2025
                                </MpText>
                              </MpFlex>
                              <MpFlex
                                alignItems="center"
                                padding="1"
                                cursor="pointer"
                              >
                                <MpText color="text.link"> & 5 more </MpText>
                              </MpFlex>
                            </MpFlex>
                          </MpFlex>
                        </MpFlex>

                        <!-- AI Metrics -->
                        <MpFlex
                          gap="4"
                          alignItems="center"
                          padding="3 4"
                          backgroundColor="chart.cat03.bold"
                        >
                          <MpFlex direction="column" gap="0.5" flex="1">
                            <MpText color="text.inverse">
                              Response time
                            </MpText>
                            <MpText weight="semiBold" color="text.inverse">
                              5.1 seconds
                            </MpText>
                          </MpFlex>

                          <MpFlex
                            :class="
                              css({
                                width: '0.5',
                                height: '42px',
                                backgroundColor: 'background.neutral',
                                transform: 'rotate(90deg)'
                              })
                            "
                          />

                          <MpFlex direction="column" gap="0.5" flex="1">
                            <MpFlex alignItems="center" gap="1">
                              <MpText color="text.inverse"> Confidence </MpText>
                              <MpIcon
                                name="info"
                                size="sm"
                                color="icon.inverse"
                              />
                            </MpFlex>
                            <MpText weight="semiBold" color="text.inverse">
                              80%
                            </MpText>
                          </MpFlex>

                          <MpFlex
                            width="0.5"
                            height="42px"
                            backgroundColor="background.neutral"
                            transform="rotate(90deg)"
                          />

                          <MpFlex direction="column" gap="0.5" flex="1">
                            <MpFlex alignItems="center" gap="1">
                              <MpText color="text.inverse"> Relevance </MpText>
                              <MpIcon
                                name="info"
                                size="sm"
                                color="icon.inverse"
                              />
                            </MpFlex>
                            <MpText weight="semiBold" color="text.inverse">
                              90%
                            </MpText>
                          </MpFlex>
                        </MpFlex>
                      </MpFlex>

                      <!-- Feedback -->
                      <MpFlex
                        alignItems="center"
                        gap="3"
                        justifyContent="space-between"
                      >
                        <MpText color="text.default" flex="1">
                          Was this response good and accurate?
                        </MpText>
                        <MpFlex gap="2">
                          <MpButton
                            left-icon="like"
                            variant="secondary"
                            :class="
                              css({
                                backgroundColor: 'background.neutral.subtle'
                              })
                            "
                          />
                          <MpButton
                            left-icon="dislike"
                            variant="secondary"
                            :class="
                              css({
                                backgroundColor: 'background.neutral.subtle'
                              })
                            "
                          />
                        </MpFlex>
                      </MpFlex>
                    </MpFlex>
                  </MpFlex>
                </MpFlex>

                <!-- More Collapsed Cards -->
                <MpFlex
                  v-for="(card, index) in moreCollapsedCards"
                  :key="`more-${index}`"
                  direction="column"
                  padding="4"
                  backgroundColor="background.neutral.hovered"
                  borderRadius="lg"
                  cursor="pointer"
                >
                  <MpFlex
                    alignItems="center"
                    gap="3"
                    justifyContent="space-between"
                  >
                    <MpFlex alignItems="center" gap="3" flex="1">
                      <MpIcon name="help" size="sm" color="icon.default" />
                      <MpText color="text.default">
                        {{ card.question }}
                      </MpText>
                    </MpFlex>
                    <MpFlex alignItems="center" gap="2">
                      <MpText color="text.placeholder"> No review yet </MpText>
                      <MpIcon
                        name="chevrons-down"
                        size="sm"
                        color="icon.default"
                      />
                    </MpFlex>
                  </MpFlex>
                </MpFlex>
              </MpFlex>
            </MpFlex>
          </MpFlex>
        </MpDrawerBody>

        <!-- Footer -->
        <MpDrawerFooter
          :class="
            css({
              borderTopWidth: '1px',
              borderTopStyle: 'solid',
              borderTopColor: 'border.default',
              backgroundColor: 'background.stage'
            })
          "
        >
          <MpFlex gap="3" justifyContent="flex-end" width="full">
            <MpButton variant="ghost" @click="onCloseDrawer"> Cancel </MpButton>
            <MpButton variant="secondary"> Edit AI agent </MpButton>
          </MpFlex>
        </MpDrawerFooter>
      </MpDrawerContent>

      <MpDrawerOverlay />
    </MpDrawer>
  </MpFlex>
</template>

<script setup lang="ts">
// 1. Imports
import { ref } from "vue";
import {
  MpFlex,
  MpText,
  MpButton,
  MpDrawer,
  MpDrawerContent,
  MpDrawerHeader,
  MpDrawerBody,
  MpDrawerFooter,
  MpDrawerCloseButton,
  MpDrawerOverlay,
  MpBadge,
  MpProgress,
  MpBanner,
  MpBannerIcon,
  MpBannerDescription,
  MpIcon,
  MpTable,
  MpTableHead,
  MpTableBody,
  MpTableRow,
  MpTableCell,
  MpTableContainer,
  css
} from "@mekari/pixel3";

// 4. Reactive state
const isDrawerOpen = ref(false);

const questionGroups = ref([
  { id: 1, title: "Cara refund produk" },
  { id: 2, title: "Spesifikasi & harga produk" },
  { id: 3, title: "Kualitas produk" },
  { id: 4, title: "Ketersediaan stok" },
  { id: 5, title: "Pengiriman barang" },
  { id: 6, title: "Garansi produk" },
  { id: 7, title: "Metode pembayaran" },
  { id: 8, title: "Pengembalian produk" },
  { id: 9, title: "Layanan pelanggan 24/7" },
  { id: 10, title: "Ulasan produk" },
  { id: 11, title: "Pembaruan status pengiriman" },
  { id: 12, title: "Pengaturan akun pengguna" },
  { id: 13, title: "Diskon & promo" },
  { id: 14, title: "Saran produk" },
  { id: 15, title: "Kebijakan privasi" },
  { id: 16, title: "Bantuan teknis" }
]);

const collapsedCards = ref([
  { question: "Hai mau refund dong. Gimana caranya?" }
]);

const moreCollapsedCards = ref([
  {
    question:
      "Hai kak aku mau refund dan mengembalikan barang, gimana caranya ya?"
  },
  {
    question: "Saya ingin refund dan mengembalikan barang. Bagaimana caranya?"
  },
  {
    question:
      "Saya ingin mengajukan refund untuk produk yang ingin saya kembalikan."
  },
  {
    question:
      "Saya mau mengembalikan barang dan mengajukan refund. Mohon informasinya."
  },
  {
    question:
      "Bagaimana prosedur refund jika barang dikembalikan? Ingin klaim refund karena ingin mengembalikan produk."
  },
  {
    question: "Saya ingin refund dan mengembalikan barang. Bagaimana caranya?"
  }
]);

// 8. Functions
function onCloseDrawer() {
  isDrawerOpen.value = false;
}

function expandCard(index: number) {
  console.log("Expand card:", index);
}
</script>
